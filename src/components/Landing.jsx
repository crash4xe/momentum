import { useEffect, useState } from "react";
import quotes from "../data/quotes";
import "./Landing.css";
function Landing() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(Math.round((Math.random() * 100) / 2));
  }, []);

  return (
    <main
      className="anime"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <header>
        <h1>{quotes[value].quote}</h1>
        <p style={{ textAlign: "right" }}>
          <i>{quotes[value].author}</i>
        </p>
      </header>
    </main>
  );
}

export default Landing;
