import express from "express";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";

const router = express.Router();

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/id/:id", userController.getUserById);

router.post("/api/auth/login", authController.login)

export default router;