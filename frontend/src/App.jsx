import React from 'react'
import TaskManager from "./pages/TaskManager";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";

const App = () => {
  return (
    <>
      <TaskManager />
      {/* <Router>
        <Routes>
          <Route path="/" element={<TaskManager />} />
        </Routes>
      </Router> */}
    </>
  )
}

export default App
