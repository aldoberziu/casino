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
  const [balance, setBalance] = useState({ cash: 0, bank: 0, total: 0 });
  const [workTimer, setWorkTimer] = useState({ time: 0, timer: false });
  // const [workTimer, setWorkTimer] = useState(false);
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
    setBalance({ ...balance, total: balance.cash + balance.bank });
  }, [balance.cash, balance.bank]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendBtn.current.click();
    }
  };
  const handleWorkTime = (seconds) => {
    setWorkTimer({ ...workTimer, time: seconds });
  };
  const childWorkTimer = (value) => {
    setWorkTimer({ ...workTimer, timer: value });
  };
  const handleSlutTimer = (seconds) => {
    setSlutSeconds(seconds);
  };
  const childSlutTimer = (value) => {
    console.log(value);
    setSlutTimer(value);
  };
  const handleSubmit = () => {
    if (input.startsWith("!")) {
      switch (input) {
        case "!work":
          if (!workTimer.timer) {
            setWorkTimer({ ...workTimer, timer: true });
            const workMoney = getRandomNumber(1, 1000);
            setBalance({ ...balance, cash: balance.cash + workMoney });
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
                message: `You can work again in ${workTimer.time} seconds.`,
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
              setBalance({ ...balance, cash: balance.cash + slutMoney });
              let randomSlut = getRandomMessage(niceSluts);
              const message = randomSlut.replace("{}", slutMoney);
              setMessages((state) => [
                ...state,
                { type: "green", message: message, action: "/slut" },
              ]);
            } else {
              const slutFine = getRandomNumber(1, 2500);
              setBalance({ ...balance, cash: balance.cash - slutFine });
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
            setBalance({ ...balance, cash: balance.cash + crimeMoney });
            let randomCrime = getRandomMessage(niceCrimes);
            const message = randomCrime.replace("{}", crimeMoney);
            setMessages((state) => [
              ...state,
              { type: "green", message: message, action: "/crime" },
            ]);
          } else {
            const crimeFine = getRandomNumber(1, 2500);
            setBalance({ ...balance, cash: balance.cash - crimeFine });
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
              message: `Cash Balance: ${balance.cash}.\nBank Balance: ${balance.bank}.\nTotal Balance: ${balance.total}`,
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
          if (balance.cash <= 0) {
            setMessages((state) => [
              ...state,
              {
                type: "bot",
                message: `There was no money in cash to deposit. Currently you have ${balance.cash}`,
                action: "/deposit",
              },
            ]);
          } else {
            setBalance({ ...balance, bank: balance.bank + balance.cash });
            setMessages((state) => [
              ...state,
              {
                type: "bot",
                message: `Successfully deposited ${balance.cash} to your bank!`,
                action: "/deposit",
              },
            ]);
            setBalance({ ...balance, cash: 0 });
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
          } else if (coins > balance.cash) {
            setMessages((state) => [
              ...state,
              {
                type: "error",
                message: `You cannot deposit more than you have in cash! Currently you have ${balance.cash}`,
                action: "/deposit",
              },
            ]);
          } else {
            setBalance({ ...balance, bank: balance.bank + parseInt(coins) });
            setMessages((state) => [
              ...state,
              {
                type: "bot",
                message: `Successfully deposited ${coins} to your bank!`,
                action: "/deposit",
              },
            ]);
            setBalance({ ...balance, cash: 0 });
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
        handleTimer={handleWorkTime}
        time={60}
        timer={workTimer.timer}
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
