import express from "express";
import * as taskRoute from "../controllers/tasksController.js";
import { protect } from "../middlewares/authMIddleware.js";

const router = express.Router();

router.use(protect)

router.post("/", taskRoute.createTask);
router.get("/", taskRoute.getMyTasks);
router.get("/usertasks/:id", taskRoute.getUserWithTask);
router.get("/alltask", taskRoute.getAllTasks)
router.patch("/:id", taskRoute.updateTask);
router.delete("/:id", taskRoute.deleteTask);

export default router;