module.exports = {
  apps: [
    {
      name: "abesitbot",
      script: "./index.js",
      watch: false,
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
