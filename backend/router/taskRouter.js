import express from "express";
import { createTask, deleteTask , getAllTasksOfUser, updateTask } from "../controller/TaskController.js";

const router = express.Router();


router.post('/' , createTask);

router.get('/:id' , getAllTasksOfUser);

router.put('/:id' , updateTask);

router.delete('/:id' , deleteTask);

export default router;