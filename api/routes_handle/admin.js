const database = require("../databaseConfig/index");
const jwt = require("jsonwebtoken");

const config = require("../config");

// 管理员登录
exports.login = (req, res) => {
  const userinfo = req.body;

  if (!userinfo.username || !userinfo.password) {
    return res.response("用户名或密码不能为空");
  }
  const sql = `select * from admin where username=?`;

  database.query(sql, userinfo.username, function (err, results) {
    if (err) return res.response(err);
    if (results.length !== 1) return res.response("用户不存在")
    const compareResult = userinfo.password === results[0].password;
    if (!compareResult) return res.response("密码错误");
    const { id, username, role } = results[0];
    let user = {
      id,
      username,
    };
    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    setTimeout(() => {
      res.send({
        code: 0,
        message: "登录成功！",
        result: {
          token: "Bearer " + token,
          userInfo: username,
          role: role,
        },
      });
    }, 500);
  });
};

exports.getUserInfo = (req, res) => {
  setTimeout(() => {
    return res.send({
      code: 0,
      message: "success",
      result: {
        "userId": "1",
        "username": "amdin",
        "realName": "amdin",
        "avatar": "",
        "desc": "manager",
        "password": "123456",
        "homePath": "/home/index",
        "roles": [
          {
            "roleName": "Super Admin",
            "value": "super"
          }
        ]
      },
    });
  }, 150);
};


