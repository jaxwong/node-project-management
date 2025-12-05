import { Router } from "express";
import { getUsers } from "@/src/controllers/userController";

const router = Router();
router.get("/", getUsers);

export default router;