import styles from "./Home.module.css";
import { useState, useRef, useEffect } from "react";
import { SendMessageDM } from "@/public";
import Image from "next/image";
import { works, niceSluts, badSluts, niceCrimes, badCrimes } from "@/Constants";
import Message from "../Message";
import CountdownTimer from "../Countdown";

const Home = (props) => {
  const sendBtn = useRef();
  const chatWindow = useRef();
  const wrapperRef = useRef();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ type: "", message: "", action: "" }]);
  const [balance, setBalance] = useState({ cash: 0, bank: 0, total: 0 });
  const [workTimer, setWorkTimer] = useState({ time: 0, timer: false });
  const [slutTimer, setSlutTimer] = useState({ time: 0, timer: false });
  const [crimeTimer, setCrimeTimer] = useState({ time: 0, timer: false });
  const [inputFocus, setInputFocus] = useState(false);

  const getRandomNumber = (min, max) => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomNumber;
  };
  const getRandomMessage = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  const secondsToTime = (data) => {
    const minutes = Math.floor(data / 60);
    const seconds = data - minutes * 60;
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}${
        seconds === 0 ? "" : ` and ${seconds} second${seconds > 1 ? "s" : ""}`
      }`;
    } else {
      if (seconds > 0) {
        return `${seconds} second${seconds > 1 ? "s" : ""}`;
      }
    }
  };
  useEffect(() => {
    setBalance({ ...balance, total: balance.cash + balance.bank });
  }, [balance.cash, balance.bank]);
  useEffect(() => {
    props?.inputFocus(inputFocus);
    if (inputFocus) {
      wrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inputFocus]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendBtn.current.click();
    }
  };
  const handleInputFocus = () => {
    setInputFocus(true);
  };
  const handleInputBlur = () => {
    setInputFocus(false);
  };
  const handleWorkTime = (seconds) => {
    setWorkTimer({ ...workTimer, time: seconds });
  };
  const childWorkTimer = (value) => {
    setWorkTimer({ ...workTimer, timer: value });
  };
  const handleSlutTimer = (seconds) => {
    setSlutTimer({ ...slutTimer, time: seconds });
  };
  const childSlutTimer = (value) => {
    setSlutTimer({ ...slutTimer, timer: value });
  };
  const handleCrimeTimer = (seconds) => {
    setCrimeTimer({ ...crimeTimer, time: seconds });
  };
  const childCrimeTimer = (value) => {
    setCrimeTimer({ ...crimeTimer, timer: value });
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
                message: `You can work again in ${secondsToTime(workTimer.time)}.`,
                action: "/work",
              },
            ]);
          }
          break;
        case "!slut":
          if (!slutTimer.timer) {
            setSlutTimer({ ...slutTimer, timer: true });
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
                message: `You can be a slut in ${secondsToTime(slutTimer.time)}.`,
                action: "/slut",
              },
            ]);
          }
          break;
        case "!crime":
          if (!crimeTimer.timer) {
            setCrimeTimer({ ...crimeTimer, timer: true });
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
              setMessages((state) => [
                ...state,
                { type: "red", message: message, action: "/crime" },
              ]);
            }
          } else {
            setMessages((state) => [
              ...state,
              {
                type: "error",
                message: `You can commit a crime in ${secondsToTime(crimeTimer.time)}.`,
                action: "/crime",
              },
            ]);
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
      setMessages((state) => [...state, { type: "message", message: input, action: "message" }]);
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
    chatWindow.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [messages]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.chatMessages}>
        {messages.map((el) => (
          <Message data={el} />
        ))}
        <div ref={chatWindow}></div>
      </div>
      <CountdownTimer
        handleTimer={handleWorkTime}
        time={60}
        timer={workTimer.timer}
        childTimer={childWorkTimer}
      />
      <CountdownTimer
        handleTimer={handleSlutTimer}
        time={60}
        timer={slutTimer.timer}
        childTimer={childSlutTimer}
      />
      <CountdownTimer
        handleTimer={handleCrimeTimer}
        time={120}
        timer={crimeTimer.timer}
        childTimer={childCrimeTimer}
      />
      <div className={styles.inputSection}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
          onClick={(e) => e.preventDefault()}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleEnter}
        />
        <div
          className={styles.sendMessage}
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
