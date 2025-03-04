import { useEffect, useState } from "react";
import quotes from "../data/quotes";
import "./Landing.css";
function Landing() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(Math.round((Math.random() * 100) / 2));
  }, []);

  return (
    <main className="anime">
      <header>
        <h1 style={{ padding: "0px 20px" }}>{quotes[value].quote}</h1>
        <p style={{ textAlign: "left", paddingLeft: "20px" }}>
          <i>{quotes[value].author}</i>
        </p>
      </header>
    </main>
  );
}

export default Landing;
