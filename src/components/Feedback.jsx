import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import React, { useContext, useState, useEffect } from "react";
import { styleContext } from "../App";
import { submitFeedback } from "../services/submitFeedback";
import { AuthContext } from "../context/AuthContext";

const Feedback = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitText, setSubmitText] = useState("");
  const [errors, setErrors] = useState(false);
  const styles = useContext(styleContext);
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (rating < 3 && comment.trim() === "" && rating !== 0) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [rating, comment]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   if (errors || rating === 0) {
      return;
    }
    const response = await submitFeedback(rating, comment, authenticated);
    if (response !== 201) {
      setSubmitted(true);
      setSubmitText("Failed to submit feedback. Please try again later.");
      setTimeout(()=>setSubmitted(false), 5000);
    } else {
      setSubmitted(true);
      setSubmitText("Feedback submitted successfully. Thank you!");
      setTimeout(() => onClose(), 2000);
    }
  };

  return (
    <div className="feedback-form" style={{ textAlign: "center" }}>
      <h3>Rate your experience</h3>
      <form onSubmit={handleSubmit}>
        <div>
          {[1, 2, 3, 4, 5].map((rate) => (
            <span
              key={rate}
              onClick={() => handleRating(rate)}
              style={{ cursor: "pointer" }}
            >
              {rate <= rating ? (
                <StarRoundedIcon
                  style={{
                    color: styles.darkgreen,
                    fontSize: "50px",
                  }}
                />
              ) : (
                <StarBorderRoundedIcon
                  style={{
                    color: styles.darkgreen,
                    fontSize: "50px",
                  }}
                />
              )}
            </span>
          ))}
        </div>
        <div className="comment">
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setErrors(false);
              setSubmitted(false);
            }}
            placeholder={
              errors
                ? "How can we make it better for you?"
                : "What do you think about the app?"
            }
            rows="5"
            cols="45"
            style={{
              width: "90%",
              border: errors ? `2px solid ${styles.error}` : "none",
              outline: "none",
              padding: "10px",
              borderRadius: styles.borderRadius,
              resize: "none",
            }}
          />
        </div>
        <button
          style={{
            width: "50%",
            height: "2.5rem",
            borderRadius: styles.borderRadius,
            border: "none",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "16px",
            marginTop: "10px",
            backgroundColor: styles.darkgreen,
            color: styles.light,
            cursor: "pointer",
          }}
          type="submit"
        >
          Send Feedback
        </button>
      </form>
      {submitted && <p>{submitText}</p> }
    </div>
  );
};

export default Feedback;
