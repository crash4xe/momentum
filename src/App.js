import Dashboard from "./components/Dashboard";
import Identify from "./components/Identify";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import { createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext, AuthProvider } from "./context/AuthContext";
import { ForgotPassword, ResetPassword } from "./components/ResetPassword";

export const styleContext = createContext();

function App() {
  const AuthConsumer = () => {
    const { isLoggedin } = useContext(AuthContext);
    return (
      <div className="App">
        <Landing /> {isLoggedin ? <Dashboard /> : <Identify />}
      </div>
    );
  };
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
        lightest: "#f5f5f5",
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/momentum" element={<AuthConsumer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </styleContext.Provider>
  );
}

export default App;
