import styles from "./Home.module.css";
import { useState, useRef, useEffect } from "react";
import { SendMessageDM } from "@/public";
import Image from "next/image";
import { works, niceSluts, badSluts, niceCrimes, badCrimes } from "@/Constants";
import Message from "../Message";
import CountdownTimer from "../Countdown";

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
  const [workTimer, setWorkTimer] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [slutTimer, setSlutTimer] = useState(false);
  const [slutSeconds, setSlutSeconds] = useState(0);

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
  const handleWorkTimer = (seconds) => {
    setWorkSeconds(seconds);
  };
  const handleSlutTimer = (seconds) => {
    setSlutSeconds(seconds);
  };
  const childWorkTimer = (value) => {
    setWorkTimer(value);
  };
  const childSlutTimer = (value) => {
    setSlutTimer(value);
  };
  const handleSubmit = () => {
    if (input.startsWith("!")) {
      switch (input) {
        case "!work":
          if (!workTimer) {
            setWorkTimer(true);
            const workMoney = getRandomNumber(1, 1000);
            setCashBalance(cashBalance + workMoney);
            let randomWork = getRandomMessage(works);
            const message = randomWork.replace("{}", workMoney);
            setMessages((state) => [
              ...state,
              { type: "green", message: message, action: "/work" },
            ]);
          } else {
            setMessages((state) => [
              ...state,
              {
                type: "error",
                message: `You can work again in ${workSeconds} seconds.`,
                action: "/work",
              },
            ]);
          }
          break;
        case "!slut":
          if (!slutTimer) {
            setSlutTimer(true);
            const slutAction = Math.random();
            if (slutAction > 0.5) {
              const slutMoney = getRandomNumber(1, 2500);
              setCashBalance(cashBalance + slutMoney);
              let randomSlut = getRandomMessage(niceSluts);
              const message = randomSlut.replace("{}", slutMoney);
              setMessages((state) => [
                ...state,
                { type: "green", message: message, action: "/slut" },
              ]);
            } else {
              const slutFine = getRandomNumber(1, 2500);
              setCashBalance(cashBalance - slutFine);
              let randomSlut = getRandomMessage(badSluts);
              const message = randomSlut.replace("{}", slutFine);
              setMessages((state) => [
                ...state,
                { type: "red", message: message, action: "/slut" },
              ]);
            }
          } else {
            setMessages((state) => [
              ...state,
              {
                type: "error",
                message: `You can be a slut in ${slutSeconds} seconds.`,
                action: "/slut",
              },
            ]);
          }
          break;
        case "!crime":
          const crimeAction = Math.random();
          if (crimeAction > 0.5) {
            const crimeMoney = getRandomNumber(1, 2500);
            setCashBalance(cashBalance + crimeMoney);
            let randomCrime = getRandomMessage(niceCrimes);
            const message = randomCrime.replace("{}", crimeMoney);
            setMessages((state) => [
              ...state,
              { type: "green", message: message, action: "/crime" },
            ]);
          } else {
            const crimeFine = getRandomNumber(1, 2500);
            setCashBalance(cashBalance - crimeFine);
            let randomCrime = getRandomMessage(badCrimes);
            const message = randomCrime.replace("{}", crimeFine);
            setMessages((state) => [...state, { type: "red", message: message, action: "/crime" }]);
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
      <CountdownTimer
        handleTimer={handleWorkTimer}
        time={60}
        timer={workTimer}
        childTimer={childWorkTimer}
      />
      <CountdownTimer
        handleTimer={handleSlutTimer}
        time={60}
        timer={slutTimer}
        childTimer={childSlutTimer}
      />
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
