import Calendar from "./Calendar";
import "./Dashboard.css";
import DashboardHeader from "./DashboardHeader";
import Todo from "./Todo";
import { useContext, useEffect, useState } from "react";
import { AccountCircleRounded } from "@mui/icons-material";
import { logoutUser } from "../services/authService";
import { addActivity, removeActivity } from "../services/fetchActivities";
import { fetchData } from "../services/fetchData";
import { updateStreak, fetchStreak } from "../services/fetchStreaks";
import { styleContext } from "../App";
import Overlay from "./Overlay";
import Profile from "./Profile";
import Feedback from "./Feedback";
import { AuthContext } from "../context/AuthContext";
import { fetchProfile } from "../services/fetchProfile";
import { Avatar } from "@mui/material";
import { ChangePassword } from "./ChangePassword";

function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [userMenu, setUserMenu] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const { authenticated, setIsLoggedin, setAuthenticated } =
    useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    fetchData(setTasks, authenticated);
  }, [authenticated]);

  useEffect(() => {
    fetchStreak(setStreaks, authenticated);
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      fetchProfile(authenticated, setProfile);
    }
  }, [authenticated]);

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
      updateStreak(task, authenticated, setTasks, setStreaks);
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
            {/* {true ? (
              <LightModeRounded style={iconstyles.size} />
            ) : (
              <DarkModeRounded style={iconstyles.size} />
            )} */}
            {profile ? (
              <Avatar
                alt={profile.name}
                src={profile.url}
                onClick={() => setUserMenu(!userMenu)}
                style={iconstyles.size}
              />
            ) : (
              <AccountCircleRounded
                onClick={() => setUserMenu(!userMenu)}
                style={iconstyles.size}
              />
            )}
          </div>
        </div>
        <div
          className="user-menu"
          style={{
            borderRadius: styles.borderRadius,
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
            <li
              className="li"
              onClick={() => {
                setIsOverlayOpen(true);
                setCurrentView("profile");
              }}
            >
              Profile
            </li>
            <li
              className="li"
              onClick={() => {
                setIsOverlayOpen(true);
                setCurrentView("feedbacks");
              }}
            >
              Feedback
            </li>
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
            handleSelection={handleSelection}
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
          <Calendar selectedOption={selectedOption} streaks={streaks} />
        </section>
      </div>
      <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        {currentView === "profile" && (
          <Profile
            profile={profile}
            setCurrentView={setCurrentView}
            setProfile={setProfile}
          />
        )}
        {currentView === "feedbacks" && (
          <Feedback onClose={() => setIsOverlayOpen(false)} />
        )}
        {currentView === "change-password" && <ChangePassword />}
      </Overlay>
    </main>
  );
}

export default Dashboard;
