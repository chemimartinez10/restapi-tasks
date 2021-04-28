import { Router } from "express";
import taskCtrl from "../controllers/task.controller";

//init router
const router = Router();

//ROUTES
//get all tasks
router.get("/", taskCtrl.findAll);

//get all tasks done
router.get("/done", taskCtrl.findAllDone);

//get a specific task
router.get("/:id", taskCtrl.findOne);

//insert a new task
router.post("/", taskCtrl.create);

//update a task
router.put("/:id", taskCtrl.update);

//delete a task
router.delete("/:id", taskCtrl.remove);

export default router;
