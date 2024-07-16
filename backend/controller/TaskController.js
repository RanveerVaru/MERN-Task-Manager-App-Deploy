import { TaskModel } from "../models/TaskModel.js";

export const createTask = async (req, res, next) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res
      .status(201)
      .json({
        message: "Task created successfully",
        success: true,
        data: model,
      });
  } catch (error) {
    return next(error);
  }
};

export const getAllTasksOfUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await TaskModel.find({ userId: id });
    res
      .status(200)
      .json({
        message: "Tasks retrieved successfully",
        success: true,
        data: tasks,
      });
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
    res
      .status(200)
      .json({
        message: "Task updated successfully",
        success: true,
        data: updatedTask,
      });
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    return next(error);
  }
};
