// 导入
const express = require("express");

const app = express();

const cors = require("cors");

const config = require("./config");

const { expressjwt: expressJWT } = require("express-jwt");
// 运行跨域
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.response = function (err, code = 1) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 公开静态文件夹
app.use("/public/", express.static("./public"));
// 使用.unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证, 放在路由之前
app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: ["/api/login", "/api/project/list"],
  })
);

// 导入并使用路由
const admin = require("./routes/admin");
const upload = require("./routes/upload");
app.use("/api", admin, upload);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError")
    return res.response("认证失败", 401);
  res.response(err);
});

// 启动web服务器
app.listen(9093, function () {
  console.log("api server running at http://127.0.0.1:9093");
});
