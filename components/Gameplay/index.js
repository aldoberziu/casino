import Blackjack from "../Blackjack";
import Roulette from "../Roulette";
import styles from "./Gameplay.module.css";
import { useState } from "react";

const Gameplay = ({ game }) => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.gameplay}>
      <input type="text" className={styles.input} value={input} onChange={handleInput} />
      { game === "roulette" && <Roulette />}
      { game === "blackjack" && <Blackjack />}
      <div>
        <p>{input}</p>
      </div>
    </div>
  );
};

export default Gameplay;
