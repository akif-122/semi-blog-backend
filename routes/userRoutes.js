const express = require("express");
const { getAllUsers, registerController, loginController } = require("../controllers/userController");

const router = express.Router();

// GET ALL USER
router.get("/all-users", getAllUsers);

// REGISTER USER
router.post("/register", registerController);

// LOGIN USER
router.post("/login", loginController);

module.exports = router;