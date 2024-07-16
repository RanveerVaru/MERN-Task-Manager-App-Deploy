import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { notify } from "../utils";

const API_URL = "http://localhost:8080";
const TaskManager = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTask, setCopyTask] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = async () => {
    if(input && updateTask) {
        const updatedTask = {...updateTask, taskName: input};
        const { data } = await axios.put(`${API_URL}/task/${updateTask._id}`, updatedTask);
        if (data.success) {
            notify(data.message, "success");
            getAllTasks();
            setInput("");
        } else {
            notify("Failed To Update Resource!!", "error", "error");
        }
        setUpdateTask(null);
    }else if(updateTask === null && input) {
        handleAddTask();
    }
  }

  useEffect(() => {
    if(updateTask) {
        setInput(updateTask.taskName);
    }
  },[updateTask])


//   ---------------------------ADD-TASK--------------------------
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
      userId: "66960b849046d49529ebf057",
    };
    //    rajiv : 66960ba625e8722607f77310
    try {
      const { data } = await axios.post(`${API_URL}/task`, obj);
      if (data.success) {
        notify(data.message, "success");
        getAllTasks();
      } else {
        notify("Failed To Create Resource !!", "error", "error");
      }
      setInput("");
    } catch (error) {
      console.log("error: " + error);
    }
  };

//   ---------------------------ALL-TASK-------------------------
  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/task/66960b849046d49529ebf057`
      );
      if (data.success) {
        setTasks(data.data);
        setCopyTask(data.data);
      } else {
        notify("Failed To Fetch Tasks!!", "error", "error");
      }
    } catch (error) {
      console.log("error: " + error);
    }
  };

//   ---------------------------DELETE-TASK-------------------------
  const handleDeleteTask = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/task/${id}`
      );
      if (data.success) {
        notify(data.message, "success");
        getAllTasks();
      } else {
        notify("Failed To Delete Task!!", "error", "error");
      }
    } catch (error) {
      console.log("error: " + error);
    }
    
  }

  const handleCheckAndUncheck = async (item) => {
    const { isDone , taskName , userId} = item;
    const obj = {
        taskName : taskName ,
        userId : userId,
        isDone:!isDone,
    }
    try {
        const { data } = await axios.put(`${API_URL}/task/${item._id}` , obj);
        if(data.success) {
            notify(data.message, "success");
            getAllTasks();
        }else {
            notify("Failed To Update Task!!", "error");
        }
    } catch (error) {
        console.log(error.message);
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTask];
    const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
    setTasks(results);

  }



  useEffect(() => {
    getAllTasks();
  }, []);




  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            md: "60%",
          },
          margin: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: "3rem", mt: "1rem" }}
          textAlign={"center"}
        >
          Task Manager App
        </Typography>

        {/* -------------ADD AND SEARCH TASK---------------------- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0.2rem",
            }}
          >
            <TextField
              type="text"
              onChange={(e) => setInput(e.target.value)}
              label="Add Task Here..." value={input}
            />
            <Button
              variant="contained"
              onClick={handleTask}
              sx={{ background: "green" }}
            >
              <IoMdAdd size={30} />
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "0.2rem",
            }}
          >
            <TextField type="text" onClick={handleSearch} label="Search Task Here..." />
            <Button variant="contained" sx={{ background: "green" }}>
              <IoMdSearch size={30} />
            </Button>
          </Box>
        </Box>

        {/* -------------DISPLAY ALL TASK---------------------- */}

        <Box>
          {tasks.map((task, index) => (
            <Box key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.3rem",
                gap: "1rem",
                mb: "3rem",
                mt: "3rem",
                border: "1px solid black",
              }}
            >
              <Typography variant="h5">{task.taskName}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Button variant="contained" onClick={() => handleCheckAndUncheck(task)}
                 sx={{ background: "green" }}>
                  {
                    task.isDone? (
                      "completed"
                    ) : (
                      "pending"
                    )
                  }
                </Button>
                <Button variant="contained" onClick={() => handleDeleteTask(task._id)} sx={{ background: "red" }}>
                  <AiFillDelete size={20} />
                </Button>
                <Button variant="contained" onClick={() => setUpdateTask(task)} sx={{ background: "blue" }}>
                  <MdEdit size={20} />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </>
  );
};

export default TaskManager;
