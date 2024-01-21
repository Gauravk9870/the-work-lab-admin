import React from "react";
import styles from "./loading.module.scss";
import ReactDOM from "react-dom";

const Loading = ({ message }) => {
  return ReactDOM.createPortal(
    <div className={styles[`loading-overlay`]}>
      <div className={styles[`loading-content`]}>
        <div className={styles.loader}>
          <label>{message}</label>
          <div className={styles.loading}></div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Loading;
