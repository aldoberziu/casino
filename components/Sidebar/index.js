import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  const [game, setGame] = useState("roulette");

  useEffect(() => {
    props?.selectedGame?.(game);
  }, [game]);
  
  return (
    <div className={styles.sidebar}>
      <p onClick={() => setGame("roulette")}>Ruleta</p>
      <p onClick={() => setGame("blackjack")}>Blackjacku</p>
      <p onClick={() => setGame("murlan")}>Murlani</p>
    </div>
  );
};

export default Sidebar;
