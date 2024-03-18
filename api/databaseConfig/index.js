// 数据库配置
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "xxx",
  database: "xxx",
  dateStrings: true,
});
module.exports = db;
