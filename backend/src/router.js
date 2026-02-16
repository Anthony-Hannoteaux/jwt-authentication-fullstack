import express from "express";
import userController from "./controllers/userController.js";

const router = express.Router();

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/id/:id", userController.getUserById);


export default router;