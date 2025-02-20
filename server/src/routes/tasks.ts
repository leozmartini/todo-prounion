import { Router } from "express";
import { addTask, getTasks, updateTask, deleteTask } from "../controllers/tasks";

const router: Router = Router();

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
