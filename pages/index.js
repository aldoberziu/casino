import Head from "next/head";
import Header from "@/components/Header";
import Gameplay from "@/components/Gameplay";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState('');
  const selectedGame = (value) => {
    setGame(value);
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" interactive-widget="resizes-content"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <Header />
        <Sidebar selectedGame={selectedGame}/>
        <Gameplay game={game}/>
      </div>
    </>
  );
}
