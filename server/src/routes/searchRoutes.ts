import { Router } from "express";
import { search } from "@/src/controllers/searchController";

const router = Router();
router.get("/", search);

export default router;