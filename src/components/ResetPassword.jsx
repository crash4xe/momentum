import { useContext, useState } from "react";
import "./Identify.css";
import { styleContext } from "../App";
import { CircularProgress } from "@mui/material";
import { resetPassword } from "../services/authService";
import { CheckCircleOutline, ErrorOutlineOutlined } from "@mui/icons-material";
import { ChangePassword } from "./ChangePassword";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
function ForgotPassword() {
  const styles = useContext(styleContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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
        formErrors.reset = error.message;
        setErrors(formErrors);
      } else {
        e.target.username.value = "";
      }
      setLoading(false);
      setIsOverlayOpen(true);
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
      {isOverlayOpen ? (
        <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
          {errors.reset ? (
            <div style={{ textAlign: "center" }}>
              <ErrorOutlineOutlined
                sx={{ color: styles.error, height: "60px", width: "60px" }}
              ></ErrorOutlineOutlined>
              <b style={{ fontSize: "20px", display: "block" }}>
                Password reset failed!
              </b>
              <p>
                Oops!! failed to reset password: {errors.reset}. please try
                again later, if the issue still exist
                <a href="mailto:jayantparker99@gmail.com">contact us</a>.
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CheckCircleOutline
                sx={{ color: styles.lightgreen, height: "60px", width: "60px" }}
              ></CheckCircleOutline>
              <b style={{ fontSize: "20px", display: "block" }}>
                Password reset mail sent!
              </b>
              <p>
                We have sent you a link to reset your password. Please check
                your mail inbox.
              </p>
              <Link
                to="/momentum"
                style={{ textDecoration: "none", color: styles.darkest }}
              >
                <button
                  style={{
                    width: "80%",
                    height: "2.5rem",
                    borderRadius: "20px",
                    border: "none",
                    outline: "none",
                    padding: "10px",
                    boxSizing: "border-box",
                    fontSize: "16px",
                    marginTop: "10px",
                    backgroundColor: styles.midgreen,
                    cursor: "pointer",
                    color: styles.light,
                  }}
                >
                  Back to Login
                </button>
              </Link>
            </div>
          )}
        </Overlay>
      ) : (
        <form
          className="resetpassword-form"
          style={{
            backgroundColor: styles.dark,
          }}
          onSubmit={handleSubmit}
        >
          <header style={{ textAlign: "center" }}>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="logo"
              height="70px"
            />
            {/* <strong style={{ display: "block" }}>Forgot Password</strong> */}
            <p style={{ margin: 0 }}>
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "15px 0px 0px",
            }}
          >
            <Link
              to="/momentum"
              style={{ textDecoration: "none", color: styles.lightest }}
            >
              Back to Login
            </Link>
          </div>
        </form>
      )}
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
