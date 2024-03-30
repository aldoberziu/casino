import Blackjack from "../Blackjack";
import Roulette from "../Roulette";
import Home from "../Home";
import styles from "./Gameplay.module.scss";
import getWindowViewport from "../../utils/windowViewport";
import { useState } from "react";

const Gameplay = ({ game }) => {
  const [keyboardActive, setKeyboardActive] = useState(false);
  const handleInputFocus = (value) => {
    setKeyboardActive(value);
  };
  const windowViewport = getWindowViewport();
  return (
    <div
      className={styles.gameplay}
      style={keyboardActive && windowViewport[0] > 768 ? { height: windowViewport[1] } : {}}
    >
      {game === "home" && <Home inputFocus={handleInputFocus} />}
      {game === "roulette" && <Roulette />}
      {game === "blackjack" && <Blackjack />}
    </div>
  );
};

export default Gameplay;
