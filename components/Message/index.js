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
            <p>{data.type !== "message" ? "Casino Tajvani ✔️" : "user_name"}</p>
            <p className={styles.action}>
              used<span>{data.action !== "" ? `${data.action}` : ""}</span>
            </p>
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
