import { Link } from "react-router-dom";
import { loginUser, signUp } from "../services/authService";
import { useContext, useState, useEffect } from "react";
import "./Identify.css";
import { CheckCircleOutline, ErrorOutlineOutlined } from "@mui/icons-material";
import { styleContext } from "../App";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Overlay from "./Overlay";

function Login({ setAuthenticated, setIsRegistered, setIsLoggedin }) {
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

    if (!e.target.password.value) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      setLoading(true);
      const authenticated = await loginUser(
        e.target.username.value,
        e.target.password.value
      );

      if (authenticated.error) {
        formErrors.invalidcred = authenticated.error;
        setErrors(formErrors);
      } else {
        const session = localStorage.getItem(
          "sb-kkgjertrzzugmncqisbj-auth-token"
        );
        const sessionData = JSON.parse(session);
        setAuthenticated(sessionData);
        setIsLoggedin(authenticated.data.user.role === "authenticated");
        e.target.username.value = "";
        e.target.password.value = "";
      }
      setLoading(false);
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    setIsRegistered(false);
  }

  return (
    <main
      className="login"
      style={{
        height: "100vh",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        className="login-form"
        style={{
          backgroundColor: styles.dark,
        }}
        onSubmit={handleSubmit}
      >
        <header>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="logo"
            height="70px"
          />
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
        <input
          type="password"
          placeholder=" Password "
          name="password"
          onFocus={() => setErrors({})}
          style={{
            display: "block",
            width: "100%",
            height: "2.5rem",
            borderRadius: styles.borderRadius,
            border: errors.password ? `2px solid ${styles.error}` : "none",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "16px",
            marginTop: "25px",
          }}
        />
        {errors.password && (
          <div style={{ color: styles.error, fontSize: styles.subfont }}>
            {errors.password}
          </div>
        )}
        {errors.invalidcred && (
          <div style={{ color: styles.error, fontSize: styles.subfont }}>
            {errors.invalidcred}
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
            "Log in"
          )}
        </button>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              color: "#f5f5f5",
            }}
          >
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            height: "2.5rem",
            borderRadius: "20px",
            border: "2px solid #D8E9A8",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "16px",
            marginTop: "25px",
            backgroundColor: "inherit",
            color: "#D8E9A8",
            cursor: "pointer",
          }}
        >
          Create an account
        </button>
      </form>
    </main>
  );
}

function Register({ setIsRegistered }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passLen, setPassLen] = useState(false);
  const [numsym, setNumsym] = useState(false);
  const [casing, setCasing] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const styles = useContext(styleContext);

  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasNumSym = /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
    const hasCasing = /[a-z]/.test(password) && /[A-Z]/.test(password);

    setPassLen(hasLength);
    setNumsym(hasNumSym);
    setCasing(hasCasing);
  }, [password, cnfpassword]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = {};
    let isValid = true;

    if (!email) {
      formErrors.email = "Oops! You missed your email";
      isValid = false;
    }

    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    if (password !== cnfpassword) {
      formErrors.cnfpassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid && passLen && numsym && casing) {
      setLoading(true);
      const { data, error } = await signUp(email, password);
      if (data !== null) {
        setEmail("");
        setPassword("");
        setCnfpassword("");
      } else {
        formErrors.signup = error.message;
        setErrors(formErrors);
      }
      setLoading(false);
      setIsOverlayOpen(true);
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    setIsRegistered(true);
  }

  return (
    <main
      className="register"
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
          {errors.signup ? (
            <div style={{ textAlign: "center" }}>
              <ErrorOutlineOutlined
                sx={{ color: styles.error, height: "60px", width: "60px" }}
              ></ErrorOutlineOutlined>
              <b style={{ fontSize: "20px", display: "block" }}>
                Account creation failed!
              </b>
              <p>
                Oops!! failed to create account: {errors.signup}. please try
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
                Account created successfully!
              </b>
              <p>
                Thank you for signing up, before you login please check your
                mail to verify your account and get started
              </p>
              <button
                onClick={handleRegister}
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
            </div>
          )}
        </Overlay>
      ) : (
        <form
          className="register-form"
          style={{
            backgroundColor: styles.dark,
          }}
          onSubmit={handleSubmit}
        >
          <header>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="logo"
              height="70px"
            />
          </header>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prevState) => ({ ...prevState, email: "" }));
            }}
            onFocus={() => setErrors({})}
            placeholder=" Email "
            className="inline-block"
            style={{
              display: "block",
              width: "100%",
              height: "2.5rem",
              borderRadius: "7px",
              border: errors.email ? `2px solid ${styles.error}` : "none",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              fontSize: "16px",
              marginTop: "15px",
              background: "#f5f5f5",
            }}
          ></input>
          {errors.email && (
            <div style={{ color: styles.error, fontSize: styles.subfont }}>
              {errors.email}
            </div>
          )}
          <input
            type="password"
            placeholder=" Password "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            onFocus={() => {
              setErrors({});
              setShow(!show);
            }}
            onBlur={() => setShow(!show)}
            style={{
              display: "block",
              width: "100%",
              height: "2.5rem",
              borderRadius: "7px",
              border: errors.password ? `2px solid ${styles.error}` : "none",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              fontSize: "16px",
              marginTop: "25px",
              background: "#f5f5f5",
            }}
          />
          {errors.password && (
            <div style={{ color: styles.error, fontSize: styles.subfont }}>
              {errors.password}
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: show ? "block" : "none",
              fontSize: "14 px",
              color: "#757575",
            }}
          >
            <ul style={{ listStyle: "none" }}>
              <li
                style={{
                  alignItems: "center",
                  display: "flex",
                  margin: "5px 0",
                  color: passLen ? "#BDBDBD" : "inherit",
                }}
              >
                <CheckCircleOutline
                  style={{
                    paddingRight: "5px",
                    color: passLen ? "#4CAF50" : "inherit",
                  }}
                />
                Atleast 8 characters
              </li>
              <li
                style={{
                  alignItems: "center",
                  display: "flex",
                  margin: "5px 0",
                  color: numsym ? "#BDBDBD" : "inherit",
                }}
              >
                <CheckCircleOutline
                  style={{
                    paddingRight: "5px",
                    color: numsym ? "#4CAF50" : "inherit",
                  }}
                />
                Include numbers and symbols
              </li>
              <li
                style={{
                  alignItems: "center",
                  display: "flex",
                  margin: "5px 0",
                  color: casing ? "#BDBDBD" : "inherit",
                }}
              >
                <CheckCircleOutline
                  style={{
                    paddingRight: "5px",
                    color: casing ? "#4CAF50" : "inherit",
                  }}
                />
                Include capital and small letters
              </li>
            </ul>
          </div>
          <input
            type="password"
            placeholder=" Confirm Password "
            name="password"
            value={cnfpassword}
            onChange={(e) => {
              setCnfpassword(e.target.value);
              setErrors((prevState) => ({ ...prevState, cnfpassword: "" }));
            }}
            onFocus={() => setErrors({})}
            style={{
              display: "block",
              width: "100%",
              height: "2.5rem",
              borderRadius: "7px",
              border: errors.cnfpassword ? `2px solid ${styles.error}` : "none",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              fontSize: "16px",
              marginTop: "25px",
              background: "#f5f5f5",
            }}
          />
          {errors.cnfpassword && (
            <div style={{ color: styles.error, fontSize: styles.subfont }}>
              {errors.cnfpassword}
            </div>
          )}
          <button
            type="submit"
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
              "Sign up"
            )}
          </button>
          <button
            onClick={handleRegister}
            style={{
              width: "100%",
              height: "2.5rem",
              borderRadius: "20px",
              border: "2px solid #D8E9A8",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              fontSize: "16px",
              marginTop: "40px",
              backgroundColor: "inherit",
              color: "#D8E9A8",
              cursor: "pointer",
            }}
          >
            Already have an account
          </button>
        </form>
      )}
    </main>
  );
}

function Identify() {
  const [isRegistered, setIsRegistered] = useState(true);
  const auth = useContext(AuthContext);
  return isRegistered ? (
    <Login
      setAuthenticated={auth.setAuthenticated}
      setIsRegistered={setIsRegistered}
      setIsLoggedin={auth.setIsLoggedin}
    />
  ) : (
    <Register setIsRegistered={setIsRegistered} isRegistered={isRegistered} />
  );
}

export default Identify;
