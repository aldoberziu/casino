import styles from "./Message.module.css";

const Message = ({ data }) => {
  if (data.type !== "") {
    return (
      <div
        className={`${styles.wrapper}  ${
          data.type === "green"
            ? styles.green
            : data.type === "red"
            ? styles.red
            : data.type === "bot"
            ? styles.bot
            : data.type === "error"
            ? styles.error
            : data.type === "message"
            ? styles.message
            : ""
        }`}
      >
        <div className={styles.container}>
          <div className={styles.username}>
            {data.type !== "message" ? <p>Casino Tajvani ✔️</p> : <p>user_name</p>}
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
