const fs = require("fs");
const path = require("path");
const { users } = require("./database");

const dataFile = path.join(__dirname, "..", "attendance.json");

let data = { records: {} };

if (fs.existsSync(dataFile)) {
  data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  if (!data.records) data.records = {};
}

function save() {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
}

// India timezone me aaj ki date "YYYY-MM-DD" format me
function todayKey() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

// status: "present" | "absent"
function markAttendance(id, status) {
  const date = todayKey();
  id = String(id);

  if (!data.records[date]) data.records[date] = { holiday: false, marks: {} };

  if (data.records[date].holiday) {
    return { ok: false, reason: "holiday" };
  }

  data.records[date].marks[id] = status;
  save();
  return { ok: true, date };
}

// Sirf admin isko call karega
function markHoliday(reason) {
  const date = todayKey();
  data.records[date] = { holiday: true, reason: reason || "Holiday", marks: {} };
  save();
  return date;
}

function isHolidayToday() {
  const date = todayKey();
  return !!(data.records[date] && data.records[date].holiday);
}

function getRecordForDate(date) {
  return data.records[date] || { holiday: false, marks: {} };
}

function getTodayRecord() {
  return getRecordForDate(todayKey());
}

// Ek user ki total present/absent/holiday count
function getUserStats(id) {
  id = String(id);
  let present = 0,
    absent = 0,
    holidays = 0;

  for (const date in data.records) {
    const rec = data.records[date];
    if (rec.holiday) {
      holidays++;
      continue;
    }
    const mark = rec.marks[id];
    if (mark === "present") present++;
    else if (mark === "absent") absent++;
  }

  return { present, absent, holidays, totalMarked: present + absent };
}

// Members ki list existing users.json (utils/database.js) se hi leta hai
// -- alag se register karne ki zarurat nahi, jo bhi group me active hai wo yahan hoga
function getAllMembers() {
  const members = {};
  for (const id in users) {
    members[id] = { name: users[id].name, username: users[id].username || null };
  }
  return members;
}

// Aaj jinhone abhi tak attendance nahi lagayi (holiday din ko exclude)
function getUnmarkedToday() {
  const rec = getTodayRecord();
  if (rec.holiday) return [];

  const members = getAllMembers();
  const unmarked = [];
  for (const id in members) {
    if (!rec.marks[id]) {
      unmarked.push({ id, ...members[id] });
    }
  }
  return unmarked;
}

// Sabki total stats ek saath (admin report ke liye)
function getAllStats() {
  const members = getAllMembers();
  const stats = {};
  for (const id in members) {
    stats[id] = { ...members[id], ...getUserStats(id) };
  }
  return stats;
}

module.exports = {
  todayKey,
  markAttendance,
  markHoliday,
  isHolidayToday,
  getRecordForDate,
  getTodayRecord,
  getUserStats,
  getAllMembers,
  getUnmarkedToday,
  getAllStats,
};
