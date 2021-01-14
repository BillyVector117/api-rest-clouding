import { Router } from "express";
const router = Router();
import * as taskController from "../controllers/taskController";
// /api/tasks...
router.post("/", taskController.addNewTask);
router.get("/", taskController.getAllTask); // /api/tasks/?page=1&size=4 (pagination available)
router.get("/checked", taskController.getAllTaskChecked);
router.get("/unChecked", taskController.getAllTaskUnChecked);
router.get("/done", taskController.findAllDoneTask);
router.get("/:id", taskController.getOneTask);
router.delete("/:id", taskController.deleteOneTask);
router.put("/:id", taskController.updateTask);

export default router;
// Hacer check button y doneTasks front, edit page
