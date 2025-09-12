const express = require("express");
const { registerUser, loginUser, verifyUser, forgotPassword, resetPassword } = require("../controllers/authController");
const auth = require("../middleware/auth");
const { getMe, updateMe } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyUser);  

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);








router.get("/user/me", auth, getMe);
router.patch("/user/me", auth, updateMe);



module.exports = router;