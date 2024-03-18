const multer = require("multer");
const path = require("path"); //
const fs = require('fs');
let imgPath = "/public/default/";
let temp = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.num == 'undefined' || req.body.num == 'null') {
      cb({ error: "请传入编号" });
    }
    imgPath = '/public/' + req.body.num + '/';
    const uploadDir = '../public/' + req.body.num || '../public/default';
    const fullPath = path.join(__dirname, "./", uploadDir);
    // 检查目录是否存在，如果不存在则创建
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    if (file.mimetype.match('image.*') || file.mimetype.match('video.*')) {
      cb(null, fullPath);
    } else {
      cb({ error: "请上传视频或者图片" });
    }
  },

  filename: function (req, file, cb) {
    let fileFormat = file.originalname.split(".");
    const min = 1000;
    const max = 9999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    cb(null, new Date().getTime() + "" + randomNum + "." + fileFormat[fileFormat.length - 1]);
  },
});

const multerConfig = multer({
  storage: temp,
});

const fileName = "file";


function upload(req, res) {
  return new Promise((resolve, reject) => {
    multerConfig.array(fileName)(req, res, function (err) {
      if (err) {
        reject(err);
        console.log(err)
      } else {
        let imgArr = [];
        req.files.forEach((item) => {
          imgArr.push(imgPath + item.filename);
        });
        resolve(imgArr.toString());
      }
    });
  });
}

module.exports = upload;

