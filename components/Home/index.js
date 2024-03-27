import styles from "./Home.module.css";
import { useState, useRef, useEffect } from "react";
import { SendMessageDM } from "@/public";
import Image from "next/image";
import { works, niceSluts, badSluts } from "@/Constants";

const Home = () => {
  const sendBtn = useRef();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
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
    switch (input) {
      case "!work":
        const workMoney = getRandomNumber(1, 1000);
        setCashBalance(cashBalance + workMoney);
        let randomWork = getRandomMessage(works);
        const message = randomWork.replace("{}", workMoney);
        setMessage(message);
        break;
      case "!slut":
        const action = Math.random();
        if (action > 0.5) {
          const slutMoney = getRandomNumber(1, 1500);
          setCashBalance(cashBalance + slutMoney);
          let randomSlut = getRandomMessage(niceSluts);
          const message = randomSlut.replace("{}", slutMoney);
          setMessage(message);
        } else {
          const slutMoney = getRandomNumber(1, 2500);
          setCashBalance(cashBalance - slutMoney);
          let randomSlut = getRandomMessage(badSluts);
          const message = randomSlut.replace("{}", slutMoney);
          setMessage(message);
        }
        break;
      case "!bal":
        setMessage(
          `Cash Balance: ${cashBalance}. Bank Balance: ${bankBalance}. Total Balance: ${totalBalance}`
        );
        break;
    }
    if (input.startsWith("!dep")) {
      switch (input) {
        case "!dep all":
          setBankBalance(bankBalance + cashBalance);
          setMessage(`Successfully deposited ${cashBalance} to your bank!`);
          setCashBalance(0);
          break;
        case "!dep":
          setMessage("Invalid number or arguments. Use !dep <amount>");
        default:
          const coins = input.replace(/\D/g, "");
          if (coins > cashBalance) {
            setMessage(
              `You cannot deposit more than you have in cash! Currently you have ${cashBalance}`
            );
          } else {
            setBankBalance(bankBalance + parseInt(coins));
            setMessage(`Successfully deposited ${coins} to your bank!`);
            setCashBalance(cashBalance - coins);
          }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputSection}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setDisplayMessage(false);
          }}
          onKeyDown={handleEnter}
        />
        <div
          className={`${styles.sendMessage} ${displayMessage ? styles.disabled : ""}`}
          ref={sendBtn}
          onClick={() => {
            handleSubmit();
            setDisplayMessage(!displayMessage);
            setInput("");
          }}
        >
          <Image src={SendMessageDM} />
        </div>
      </div>
      <p>{displayMessage && message}</p>
    </div>
  );
};

export default Home;
