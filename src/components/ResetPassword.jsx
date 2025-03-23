import { useContext, useState } from "react";
import "./Identify.css";
import { styleContext } from "../App";
import { CircularProgress } from "@mui/material";
import { resetPassword } from "../services/authService";
import { ChangePassword } from "./ChangePassword";
function ForgotPassword() {
  const styles = useContext(styleContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = {};
    let isValid = true;

    if (!e.target.username.value) {
      formErrors.email = "Oops! You missed your email";
      isValid = false;
    }
    setErrors(formErrors);
    if (isValid) {
      setLoading(true);
      const { data, error } = await resetPassword(e.target.username.value);
      if (error) {
        console.log(error.message);
      } else {
        e.target.username.value = "";
      }
      setLoading(false);
    }
  }
  return (
    <main
      className="reset-password"
      style={{
        height: "100vh",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        className="resetpassword-form"
        style={{
          backgroundColor: styles.dark,
        }}
        onSubmit={handleSubmit}
      >
        <header style={{ textAlign: "center" }}>
          <img src="logo.png" alt="logo" height="70px" />
          <h3>Forgot Password</h3>
          <p>
            Enter your email address, we will send you a link to reset your
            password.
          </p>
        </header>
        <input
          type="email"
          name="username"
          placeholder=" Email"
          className="inline-block"
          onFocus={() => setErrors({})}
          style={{
            display: "block",
            width: "100%",
            height: "2.5rem",
            borderRadius: styles.borderRadius,
            border: errors.email ? `2px solid ${styles.error}` : "none",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "16px",
            marginTop: "15px",
          }}
        ></input>
        {errors.email && (
          <div style={{ color: styles.error, fontSize: styles.subfont }}>
            {errors.email}
          </div>
        )}
        <button
          type="submit"
          disabled={loading ? "disabled" : ""}
          style={{
            width: "100%",
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
          {loading ? (
            <CircularProgress size="1.5rem" color={styles.midgreen} />
          ) : (
            "Reset my password"
          )}
        </button>
      </form>
    </main>
  );
}

function ResetPasswrod() {
  return (
    <main
      className="update-password"
      style={{
        height: "100vh",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChangePassword reset={true} />
    </main>
  );
}

export { ForgotPassword, ResetPasswrod };
