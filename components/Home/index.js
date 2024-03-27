import styles from "./Home.module.css";
import { useState, useRef, useEffect } from "react";
import { SendMessageDM } from "@/public";
import Image from "next/image";
import { works, niceSluts, badSluts } from "@/Constants";
import Message from "../Message";

const Home = () => {
  const sendBtn = useRef();
  const chatWindow = useRef();
  const inputRef = useRef();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ type: "", message: "", action: "" }]);
  const [displayMessage, setDisplayMessage] = useState(true);
  const [bankBalance, setBankBalance] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const getRandomNumber = (min, max) => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomNumber;
  };
  const getRandomMessage = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  useEffect(() => {
    setTotalBalance(cashBalance + bankBalance);
  }, [bankBalance, cashBalance]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendBtn.current.click();
    }
  };
  const handleSubmit = () => {
    if (input.startsWith("!")) {
      switch (input) {
        case "!work":
          const workMoney = getRandomNumber(1, 1000);
          setCashBalance(cashBalance + workMoney);
          let randomWork = getRandomMessage(works);
          const message = randomWork.replace("{}", workMoney);
          setMessages((state) => [...state, { type: "green", message: message, action: "/work" }]);
          break;
        case "!slut":
          const action = Math.random();
          if (action > 0.5) {
            const slutMoney = getRandomNumber(1, 1500);
            setCashBalance(cashBalance + slutMoney);
            let randomSlut = getRandomMessage(niceSluts);
            const message = randomSlut.replace("{}", slutMoney);
            setMessages((state) => [
              ...state,
              { type: "green", message: message, action: "/slut" },
            ]);
          } else {
            const slutMoney = getRandomNumber(1, 2500);
            setCashBalance(cashBalance - slutMoney);
            let randomSlut = getRandomMessage(badSluts);
            const message = randomSlut.replace("{}", slutMoney);
            setMessages((state) => [...state, { type: "red", message: message, action: "/slut" }]);
          }
          break;
        case "!bal":
          setMessages((state) => [
            ...state,
            {
              type: "bot",
              message: `Cash Balance: ${cashBalance}.\nBank Balance: ${bankBalance}.\nTotal Balance: ${totalBalance}`,
              action: "/balance",
            },
          ]);
          break;
      }
    } else {
      setMessages((state) => [...state, { type: "message", message: input }]);
    }
    if (input.startsWith("!dep")) {
      switch (input) {
        case "!dep":
        case "!deposit":
          setMessages((state) => [
            ...state,
            {
              type: "error",
              message: "Invalid number or arguments. Use !dep <amount>",
              action: "/deposit",
            },
          ]);
          break;
        case "!dep all":
        case "!deposit all":
          if (cashBalance === 0 || cashBalance < 0) {
            setMessages((state) => [
              ...state,
              {
                type: "bot",
                message: `There was no money in cash to deposit. Currently you have ${cashBalance}`,
                action: "/deposit",
              },
            ]);
          } else {
            setBankBalance(bankBalance + cashBalance);
            setMessages((state) => [
              ...state,
              {
                type: "bot",
                message: `Successfully deposited ${cashBalance} to your bank!`,
                action: "/deposit",
              },
            ]);
            setCashBalance(0);
          }
          break;
        default:
          const coins = input.replace(/\D/g, "");
          if (coins === "") {
            setMessages((state) => [
              ...state,
              {
                type: "error",
                message: "Invalid arguments. Use !dep <amount>",
                action: "/deposit",
              },
            ]);
          } else if (coins > cashBalance) {
            setMessages((state) => [
              ...state,
              {
                type: "error",
                message: `You cannot deposit more than you have in cash! Currently you have ${cashBalance}`,
                action: "/deposit",
              },
            ]);
          } else {
            setBankBalance(bankBalance + parseInt(coins));
            setMessages((state) => [
              ...state,
              {
                type: "bot",
                message: `Successfully deposited ${coins} to your bank!`,
                action: "/deposit",
              },
            ]);
            setCashBalance(cashBalance - coins);
          }
      }
    }
  };
  useEffect(() => {
    chatWindow.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      {displayMessage && (
        <div className={styles.chatMessages}>
          {messages.map((el) => (
            <Message data={el} />
          ))}
          <div ref={chatWindow}></div>
        </div>
      )}
      <div className={styles.inputSection}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleEnter}
        />
        <div
          className={`${styles.sendMessage} ${displayMessage ? styles.disabled : ""}`}
          ref={sendBtn}
          onClick={() => {
            handleSubmit();
            setInput("");
          }}
        >
          <Image src={SendMessageDM} />
        </div>
      </div>
    </div>
  );
};

export default Home;
