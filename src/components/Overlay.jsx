import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { styleContext } from "../App";

const Overlay = ({ isOpen, onClose, children }) => {
  const styles = useContext(styleContext);
  const overlaystyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      color: styles.darkest,
    },
    overlayContent: {
      backgroundColor: styles.lightestgreen,
      padding: "20px",
      borderRadius: "8px",
      position: "relative",
      maxWidth: "350px",
      width: "90%",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
    },
  };
  return (
    isOpen && (
      <div style={overlaystyles.overlay}>
        <div style={overlaystyles.overlayContent}>
          <button style={overlaystyles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Overlay;
