import { useContext } from "react";
import { styleContext } from "../App";

function Warning({ children }) {
  const styles = useContext(styleContext);
  return (
    <div
      style={{
        color: styles.light,
        fontSize: styles.subfont,
        textAlign: "center",
        padding: "8px 0px",
      }}
    >
      {children}
    </div>
  );
}
export default Warning;
