const express = require("express");
const router = express.Router();
const handle = require("../routes_handle/admin");

// 登录
router.post("/login", handle.login);
router.get("/getUserInfo", handle.getUserInfo);

module.exports = router;
