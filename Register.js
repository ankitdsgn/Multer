const express = require("express");
const router = express.Router();
const multer = require("multer");
const userModel = require("../modules/users");
const cloudinary = require("cloudinary").v2;
router.use(express.json());
router.use(express.urlencoded());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
    // cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "dwcwvb1b9",
  api_key: "682696957784898",
  api_secret: "yf1EV3PQ_mc1l3VM2QdABvHG1Vs",
});

router.post("/", upload.single("photo"), (req, res, next) => {
  const photo = req.file.path;
  const password = req.body.password;
  const confirmpw = req.body.confirmpw;

  if (password === confirmpw) {
    cloudinary.uploader.upload(
      photo,
      { upload_preset: "image_upload" },
      async function (error, result) {
        console.log(result, error);

        const newUser = new userModel({
          firstname: req.body.firstname,
          username: req.body.username,
          password: password,
          confirmpw: confirmpw,
          photo: result.url,
        });
        await newUser.save((err, result) => {
          res.status(201).json({ message: "You are registered" });
        });
      }
    );
  } else {
    res.status(403).json({ error: "check confirm password again" });
  }
});

module.exports = router;
