import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useContext } from "react";
import { styleContext } from "../App";

function Todo({
  handleAddTask,
  handleRemoveTask,
  handleTaskChange,
  handleTaskCompletion,
  task,
  tasks,
}) {
  const styles = useContext(styleContext);
  return (
    <Container
      sx={{
        padding: "15px",
        minHeight: "320px",
      }}
    >
      <Typography variant="h6">My Tasks</Typography>
      <div
        style={{
          display: "flex",
          borderRadius: "10px",
          marginTop: "15px",
          background: styles.light,
        }}
      >
        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder=" Add your task"
          style={{
            width: "100%",
            height: "2.5rem",
            borderRadius: styles.borderRadius,
            border: "none",
            outline: "none",
            fontSize: styles.font,
            display: "block",
            backgroundColor: "transparent",
            color: styles.darkest,
            padding: "0px 20px",
          }}
        ></input>
        <button
          onClick={handleAddTask}
          style={{
            borderRadius: "10px",
            outline: "none",
            boxSizing: "border-box",
            fontSize: styles.font,
            backgroundColor: styles.light,
            color: styles.dark,
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            width: "100px",
          }}
        >
          Add
        </button>
      </div>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.activity_id}
            sx={{
              textDecoration: task.completed ? "line-through" : "",
              color: styles.light,
              "&:hover": {
                transform: "scale(1.02)",
                backgroundImage:
                  "linear-gradient(to top, rgba(255,255,255,0.05  ), rgba(255,255,255,0))",
              },
            }}
          >
            <Checkbox
              onChange={() => handleTaskCompletion(task)}
              checked={task.completed}
              sx={{
                color: styles.light,
                "&.Mui-checked": { color: styles.lightgreen },
              }}
            ></Checkbox>
            <ListItemText primary={task.activity_name} />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleRemoveTask(task.activity_id)}
            >
              <DeleteIcon
                sx={{
                  color: styles.light,
                  position: "absolute",
                  right: 10,
                }}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Todo;
