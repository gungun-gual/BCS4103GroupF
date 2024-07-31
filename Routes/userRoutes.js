const express = require('express');
const router = express.Router();
const auth = require('../auth.js');
const userController = require('../Controllers/userController');

// Route for testing
// router.get("/", (req, res) => {
//     res.send("Hello World!!!!")
// });

router.get("/", userController.getUsers);

router.get("/:id", userController.getSpecificUser);

router.post("/create", userController.createUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.updateUser);

router.post("/auth", userController.authUser);

router.post("/login", userController.loginUser);


module.exports = router;