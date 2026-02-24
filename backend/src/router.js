import express from "express";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const router = express.Router();

router.post("/api/auth/login", authController.login);
router.post("/api/auth/refresh", authController.refresh);
router.post("/api/auth/logout", authController.logout);

router.get("/api/user/me", authMiddleware, userController.getMe)

export default router;