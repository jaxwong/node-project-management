import { Router } from "express";
import { getTasks, createTask, updateTaskStatus, getUserTasks } from "@/src/controllers/taskController";

const router = Router();
router.get("/", getTasks);
router.get("/user/:userId", getUserTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;