const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
router.use(express.json());
const checkauth = require("../middleware/checkauth");
const userModel = require("../modules/users");

//Get request for profile

router.get("/:id", checkauth, async (req, res) => {
  await userModel
    .findOne({ username: req.params.id })
    .then((userdetails) => {
      console.log(userdetails);
      res.status(200).json({
        firstname: userdetails.firstname,
        username: userdetails.username,
        photo: userdetails.photo,
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
