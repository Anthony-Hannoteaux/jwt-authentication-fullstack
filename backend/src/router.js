import express from "express";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const router = express.Router();

router.post("/api/auth/register", authController.register)
router.post("/api/auth/login", authController.login);
router.post("/api/auth/refresh", authController.refresh);
router.post("/api/auth/logout", authController.logout);

router.get("/api/user/me", authMiddleware, userController.getMe)
router.patch("/api/user/me", authMiddleware, userController.updateProfileUser)
router.patch("/api/user/me/password", authMiddleware, userController.updateUserPassword)

export default router;