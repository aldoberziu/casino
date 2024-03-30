import Blackjack from "../Blackjack";
import Roulette from "../Roulette";
import Home from "../Home";
import styles from "./Gameplay.module.css";
import { useEffect, useState } from "react";

const Gameplay = ({ game }) => {
  const [keyboardActive, setKeyboardActive] = useState(false);
  const handleInputFocus = (value) => {
    setKeyboardActive(value);
  };
  return (
    <div className={`${styles.gameplay} ${keyboardActive ? styles.keyboardActive : ""}`}>
      {game === "home" && <Home inputFocus={handleInputFocus} />}
      {game === "roulette" && <Roulette />}
      {game === "blackjack" && <Blackjack />}
    </div>
  );
};

export default Gameplay;
