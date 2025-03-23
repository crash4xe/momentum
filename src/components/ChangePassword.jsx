import { useState, useContext, useEffect } from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { styleContext } from "../App";
import { changePassword } from "../services/authService";
import { CircularProgress } from "@mui/material";

export const ChangePassword = ({ reset }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passLen, setPassLen] = useState(false);
  const [numsym, setNumsym] = useState(false);
  const [casing, setCasing] = useState(false);
  const styles = useContext(styleContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [showButton, setShowButton] = useState(true);
  const textContent = reset ? "Reset Password" : "Change Password";

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

    // if (!oldPassword) {
    //   formErrors.oldPassword = "Old password is required";
    //   isValid = false;
    // }

    if (!password) {
      formErrors.password = "New password is required";
      isValid = false;
    }

    if (password !== cnfpassword) {
      formErrors.cnfpassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid && passLen && numsym && casing) {
      setLoading(true);
      const response = await changePassword(cnfpassword);
      if (response === "success") {
        setOldPassword("");
        setPassword("");
        setCnfpassword("");
        setMessage({
          msg: "Password changed successfully!",
          msgColor: styles.darkgreen,
        });
      } else {
        setMessage({
          msg: response,
          msgColor: styles.error,
        });
      }

      setLoading(false);
      setShowButton(false);
    }
  }

  return (
    <form
      className={reset ? "updatepassword-form" : ""}
      onSubmit={handleSubmit}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        background: reset && styles.dark,
      }}
    >
      <h3 style={{ textAlign: "center" }}>{textContent}</h3>
      {/* <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            height: "2.5rem",
            borderRadius: "7px",
            border: errors.oldPassword ? `2px solid ${styles.error}` : "none",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "14px",
            marginTop: "10px",
            background: "#f5f5f5",
          }}
        />
        {errors.oldPassword && (
          <div
            style={{
              color: styles.error,
              fontSize: styles.subfont,
              textAlign: "left",
              width: "100%",
            }}
          >
            {errors.oldPassword}
          </div>
        )} */}
      <input
        type="password"
        placeholder="New Password "
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name="password"
        onFocus={() => {
          setErrors({});
          setShow(!show);
          setShowButton(true);
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
          fontSize: "14px",
          marginTop: "25px",
          background: "#f5f5f5",
        }}
      />
      {errors.password && (
        <div
          style={{
            color: styles.error,
            fontSize: styles.subfont,
            textAlign: "left",
            width: "100%",
          }}
        >
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
              color: passLen ? styles.darkest : "inherit",
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
              color: numsym ? styles.darkest : "inherit",
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
              color: casing ? styles.darkest : "inherit",
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
        placeholder="Confirm Password "
        name="password"
        value={cnfpassword}
        onChange={(e) => {
          setCnfpassword(e.target.value);
          setErrors((prevState) => ({ ...prevState, cnfpassword: "" }));
        }}
        onFocus={() => {
          setErrors({});
          setShowButton(true);
        }}
        style={{
          display: "block",
          width: "100%",
          height: "2.5rem",
          borderRadius: "7px",
          border: errors.cnfpassword ? `2px solid ${styles.error}` : "none",
          outline: "none",
          padding: "10px",
          boxSizing: "border-box",
          fontSize: "14px",
          marginTop: "25px",
          background: "#f5f5f5",
        }}
      />
      {errors.cnfpassword && (
        <div
          style={{
            color: styles.error,
            fontSize: styles.subfont,
            textAlign: "left",
            width: "100%",
          }}
        >
          {errors.cnfpassword}
        </div>
      )}
      {showButton ? (
        <button
          type="submit"
          style={{
            width: "50%",
            height: "2.5rem",
            borderRadius: styles.borderRadius,
            border: "none",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "14px",
            marginTop: "20px",
            backgroundColor: styles.darkgreen,
            cursor: "pointer",
            color: styles.light,
          }}
        >
          {loading ? (
            <CircularProgress size="1.5rem" color={styles.midgreen} />
          ) : (
            textContent
          )}
        </button>
      ) : (
        <div
          style={{
            color: message.msgColor,
            marginTop: "10px",
            padding: "10px 0px",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
            fontSize: "14px ",
          }}
        >
          {message.msg}
        </div>
      )}
    </form>
  );
};
