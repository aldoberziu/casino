import styles from "./Home.module.css";
import { useState, useRef } from "react";
import { SendMessageDM } from "@/public";
import Image from "next/image";
import { works } from "@/Constants";

const Home = () => {
  const sendBtn = useRef();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState(true);
  const [bankBalance, setBankBalance] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);

  const getRandomNumber = (min, max) => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomNumber;
  };
  const getRandomWork = (works) => {
    const randomIndex = Math.floor(Math.random() * works.length);
    return works[randomIndex];
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      switch (input) {
        case "!work":
          console.log("sdkjfsdkj");
          const workMoney = getRandomNumber(1, 1000);
          setCashBalance(cashBalance + workMoney);
          let randomWork = getRandomWork(works);
          const message = randomWork.replace("{}", workMoney);
          setMessage(message);
          break;
        case "!bal":
          setMessage(`Cash Balance: ${cashBalance}. Bank Balance: ${bankBalance}`);
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
              setMessage("You cannot deposit more than you have in cash!");
            } else {
              setBankBalance(bankBalance + parseInt(coins));
              setMessage(`Successfully deposited ${coins} to your bank!`);
              setCashBalance(cashBalance - coins);
            }
        }
      }
      sendBtn.current.click();
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
          onKeyDown={handleEnterPress}
        />
        <div
          className={`${styles.sendMessage} ${displayMessage ? styles.disabled : ""}`}
          ref={sendBtn}
          onClick={() => {
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
