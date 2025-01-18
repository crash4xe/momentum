import Calendar from "./Calendar";
import "./Dashboard.css";
import DashboardHeader from "./DashboardHeader";
import Todo from "./Todo";
import { useContext, useEffect, useState } from "react";
import {
  AccountCircleRounded,
  DarkModeRounded,
  LightModeRounded,
} from "@mui/icons-material";
import { logoutUser } from "../services/authService";
import { addActivity, removeActivity } from "../services/fetchActivities";
import { fetchData } from "../services/fetchData";
import { updateStreak } from "../services/fetchStreaks";
import { styleContext } from "../App";

function Dashboard({ setAuthenticated, authenticated, setIsLoggedin }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [userMenu, setUserMenu] = useState(false);
  useEffect(() => {
    fetchData(setTasks, authenticated);
  }, [authenticated]);

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (tasks.length > 0) {
      setSelectedOption(tasks[0]);
    }
  }, [tasks]);

  const styles = useContext(styleContext);

  function handleAddTask() {
    if (task.trim() !== "") {
      addActivity(task, authenticated, setTasks);
      setTask("");
    }
  }

  function handleTaskChange(e) {
    setTask(e.target.value);
  }

  function handleTaskCompletion(task) {
    if (!task.completed) {
      updateStreak(task, authenticated, setTasks);
    }
  }

  function handleRemoveTask(index) {
    removeActivity(index, authenticated, setTasks);
  }

  function handleSelection(e) {
    const task = tasks.find(
      (task) => task.activity_id === parseInt(e.target.value)
    );
    setSelectedOption(task);
  }

  // Styles objects
  const iconstyles = {
    size: {
      height: "40px",
      width: "40px",
      margin: "0px 10px",
      cursor: "pointer",
    },
  };

  return (
    <main className="dashboard-container">
      <header>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>Momentum</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            {true ? (
              <LightModeRounded style={iconstyles.size} />
            ) : (
              <DarkModeRounded style={iconstyles.size} />
            )}
            <AccountCircleRounded
              onClick={() => setUserMenu(!userMenu)}
              style={iconstyles.size}
            />
          </div>
        </div>
        <div
          style={{
            width: "20%",
            borderRadius: styles.borderRadius,
            right: "0",
            position: "absolute",
            zIndex: "1",
            backgroundColor: styles.darkgreen,
            display: userMenu ? "block" : "none",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              textAlign: "center",
              padding: "0px 20px",
            }}
          >
            <li className="li">Profile</li>
            <li className="li">Feedbacks</li>
            <li
              className="li"
              onClick={() => {
                logoutUser();
                setAuthenticated(null);
                setIsLoggedin(false);
              }}
            >
              Log out
            </li>
          </ul>
        </div>
      </header>
      <div className="dashboard-main">
        <aside className="aside-tasklist">
          <Todo
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
            handleTaskChange={handleTaskChange}
            handleTaskCompletion={handleTaskCompletion}
            task={task}
            tasks={tasks}
          />
        </aside>
        <section className="section-calendar">
          <DashboardHeader
            tasks={tasks}
            selectedOption={selectedOption}
            handleSelection={handleSelection}
          />
          <Calendar selectedOption={selectedOption} />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
