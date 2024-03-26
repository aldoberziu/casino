import Blackjack from "../Blackjack";
import Roulette from "../Roulette";
import Home from "../Home";
import styles from "./Gameplay.module.css";
import { useState } from "react";

const Gameplay = ({ game }) => {
  return (
    <div className={styles.gameplay}>
      { game === "home" && <Home />}
      { game === "roulette" && <Roulette />}
      { game === "blackjack" && <Blackjack />}
    </div>
  );
};

export default Gameplay;
