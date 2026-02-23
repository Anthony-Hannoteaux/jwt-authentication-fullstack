import express from "express";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";

const router = express.Router();

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/id/:id", userController.getUserById);

router.post("/api/auth/login", authController.login);
router.post("/api/auth/refresh", authController.refresh);
router.post("/api/auth/logout", authController.logout);

export default router;