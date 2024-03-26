import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  const [game, setGame] = useState("home");

  useEffect(() => {
    props?.selectedGame?.(game);
  }, [game]);
  
  return (
    <div className={styles.sidebar}>
      <p onClick={() => setGame("home")}>Home</p>
      <p onClick={() => setGame("roulette")}>Ruleta</p>
      <p onClick={() => setGame("blackjack")}>Blackjacku</p>
    </div>
  );
};

export default Sidebar;
