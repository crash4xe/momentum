import "./Calendar.css";
import { useEffect, useRef, useState } from "react";

function Calendar({ selectedOption, streaks }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);
  const monthRefs = useRef([]);

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    const currentMonthElement = monthRefs.current[currentMonthIndex];

    if (currentMonthElement && calendarRef.current) {
      currentMonthElement.scrollIntoView({
        behaviour: "smooth",
        inline: "center",
      });
    }
  }, []);

  const dateRanges = selectedOption
    ? streaks
        .filter((streak) => streak.activity_id === selectedOption.activity_id)
        .map((streak) => ({ start: streak.start_date, end: streak.end_date }))
    : [];

  const isWithinDateRange = (day, monthIndex) => {
    if (!day) return false;
    const dayString = `${currentYear}-${monthIndex + 1 < 10 ? "0" : ""}${
      monthIndex + 1
    }-${day < 10 ? "0" : ""}${day}`;

    return dateRanges.some((range) => {
      const startDate = new Date(range.start);
      const endDate = new Date(range.end);
      const currentDate = new Date(dayString);

      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  const monthGrid = (month) => {
    const startOfMonth = new Date(currentYear, month, 1);
    const startDay = startOfMonth.getDay();
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

    const grid = Array.from({ length: 7 }, () => Array(5).fill(null));

    let day = 1;

    for (let col = 0; col < 6; col++) {
      for (let row = 0; row < 7; row++) {
        if (col === 0 && row < startDay) {
          continue;
        }

        if (day <= daysInMonth) {
          grid[row][col] = day++;
        }
      }
    }

    return grid;
  };

  const renderMonth = (monthIndex) => {
    const monthName = new Date(currentYear, monthIndex).toLocaleString(
      "default",
      { month: "short" }
    );
    const grid = monthGrid(monthIndex);

    return (
      <div
        key={monthIndex}
        className="month"
        ref={(el) => (monthRefs.current[monthIndex] = el)}
        style={{
          width: "200px",
          height: "240px",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <div style={{ paddingBottom: "10px", fontSize: "14px" }}>
          <b>{monthName}</b>
        </div>
        <table
          className="calendar-table"
          style={{
            margin: "0 auto",
            borderCollapse: "separate",
            borderSpacing: "4px",
            tableLayout: "fixed",
          }}
        >
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((day, colIndex) => (
                  <td
                    key={colIndex}
                    className={day ? "day" : ""}
                    style={{
                      backgroundColor: isWithinDateRange(day, monthIndex)
                        ? "#4E9F3D"
                        : "",
                    }}
                  >
                    {/* {day ? day : ""} */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderYear = () => {
    const months = Array.from({ length: 12 }, (_, i) => renderMonth(i));

    return months;
  };

  return (
    <div className="calendar" ref={calendarRef}>
      {renderYear()}
    </div>
  );
}

export default Calendar;
