import React from "react";
import Header from "./components/Header/Header";
import TaskTable from "./components/TaskTable/TaskTable";
import "./index.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TaskTable />
    </>
  );
};

export default App;
