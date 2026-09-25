import { Router } from "express";
import { getUser, login, logout, register } from "./user.controller";
import { protect } from "../../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getUser);
router.post("/logout", logout);

export default router;
