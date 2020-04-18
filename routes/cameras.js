const express = require("express");

const cameraController = require("../controllers").cameras;

const router = express.Router();

router.get("/", cameraController.getCameras);


module.exports = router;
