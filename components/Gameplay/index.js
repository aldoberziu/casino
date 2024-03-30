import Blackjack from "../Blackjack";
import Roulette from "../Roulette";
import Home from "../Home";
import styles from "./Gameplay.module.scss";
import getWindowHeight from "../../utils/windowHeight";
import { useState } from "react";

const Gameplay = ({ game }) => {
  const [keyboardActive, setKeyboardActive] = useState(false);
  const handleInputFocus = (value) => {
    setKeyboardActive(value);
  };
  const windowHeight = getWindowHeight();
  return (
    <div className={styles.gameplay} style={keyboardActive ? { height: getWindowHeight() } : {}}>
      {game === "home" && <Home inputFocus={handleInputFocus} />}
      {game === "roulette" && <Roulette />}
      {game === "blackjack" && <Blackjack />}
    </div>
  );
};

export default Gameplay;
