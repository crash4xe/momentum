import "./Dashboard.css";

function DashboardHeader({ tasks, selectedOption, handleSelection }) {
  return (
    <div className="dashboard-header">
      <select
        className="activity-dropdown"
        onChange={handleSelection}
        value={selectedOption ? selectedOption.activity_id : ""}
      >
        {tasks.map((task) => (
          <option key={task.activity_id} value={task.activity_id}>
            {task.activity_name}
          </option>
        ))}
      </select>
      <p style={{ display: "inline-block" }}>
        Current Streak: {selectedOption ? selectedOption.streak : "N/A"}
      </p>
    </div>
  );
}
export default DashboardHeader;
