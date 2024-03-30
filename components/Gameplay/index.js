import Blackjack from "../Blackjack";
import Roulette from "../Roulette";
import Home from "../Home";
import styles from "./Gameplay.module.scss";
import getWindowViewport from "../../utils/windowViewport";
import { useState } from "react";

const Gameplay = ({ game }) => {
  const [inputActive, setInputActive] = useState(false);
  const handleInputFocus = (value) => {
    setInputActive(value);
  };
  const windowViewport = getWindowViewport();
  return (
    <div
      className={styles.gameplay}
      style={
        inputActive && windowViewport[0] < 768
          ? { height: windowViewport[1] - 20, overflowY: "hidden" }
          : {}
      }
    >
      {game === "home" && <Home inputFocus={handleInputFocus} />}
      {game === "roulette" && <Roulette />}
      {game === "blackjack" && <Blackjack />}
    </div>
  );
};

export default Gameplay;
