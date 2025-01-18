import Dashboard from "./components/Dashboard";
import Identify from "./components/Identify";
import Landing from "./components/Landing";
import { createContext, useEffect, useState } from "react";
import { checkLoggedIn } from "./services/authService";

export const styleContext = createContext();

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    checkLoggedIn(setIsLoggedin, setAuthenticated);
  }, []);

  return (
    <styleContext.Provider
      value={{
        darkest: "#000",
        dark: "#191A19",
        darkgreen: "#1E5128",
        midgreen: "#1E5128",
        lightgreen: "#4E9F3D",
        lightestgreen: "#D8E9A8",
        light: "rgba(245, 245, 245, 0.7)",
        grey: "rgba(224, 224, 224, 0.2)",
        borderRadius: "7px",
        font: "14px",
        subfont: "13px",
        error: "#FF7F32",
      }}
    >
      <div className="App">
        <Landing />

        {isLoggedin ? (
          <Dashboard
            setAuthenticated={setAuthenticated}
            authenticated={authenticated}
            setIsLoggedin={setIsLoggedin}
          />
        ) : (
          <Identify
            setAuthenticated={setAuthenticated}
            setIsLoggedin={setIsLoggedin}
          />
        )}
      </div>
    </styleContext.Provider>
  );
}

export default App;
