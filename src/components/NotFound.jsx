import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styleContext } from "../App";

const NotFound = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);
  const styles = useContext(styleContext);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          navigate("/momentum");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const handleClick = () => {
    navigate("/momentum");
  };

  return (
    <main
      style={{
        backgroundColor: styles.darkest,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        flexDirection: "column",
        textAlign: "center",
        margin: "0px 20px",
      }}
    >
      <h1>Unknown Territory Ahead!</h1>
      <p style={{ fontSize: "18px" }}>
        You’ve wandered into the void. Click the button below to return to home.{" "}
        <br />
        If you're feeling adventurous... too bad — we're walking you back in{" "}
        <strong>{seconds}</strong> seconds!
      </p>
      <button
        onClick={handleClick}
        style={{
          width: "360px",
          height: "2.5rem",
          borderRadius: "20px",
          border: "none",
          outline: "none",
          padding: "10px",
          boxSizing: "border-box",
          fontSize: "16px",
          marginTop: "30px",
          backgroundColor: "#D8E9A8",
          cursor: "pointer",
        }}
      >
        Take Me Home 🏠
      </button>
    </main>
  );
};

export default NotFound;
