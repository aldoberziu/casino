import styles from "./Message.module.css";

const Message = ({ data }) => {
  if (data.type !== "") {
    return (
      <div className={styles.wrapper}>
        <div
          className={`${styles.container} ${
            data.type === "green" ? styles.green : data.type === "red" ? styles.red : styles.general
          }`}
        >
          <div className={styles.casinoName}>
            <p>Casino Tajvani ✔️</p>
          </div>
          <div className={styles.text}>
            <p>{data.message}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Message;
