function saveUsers() {
  fs.writeFileSync(
    userFile,
    JSON.stringify(users, null, 2),
    "utf8"
  );
}
