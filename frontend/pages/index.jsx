import styles from "../styles/Home.module.css";
import '@chainlink/design-system/global-styles.css';
// import PokemonBattle from "../components/PokemonBattle";
import About from '../components/About';
// import PokeStats from "../components/poke-api/PokeStats";
import React, { useState } from 'react';
import Game from "../components/Game";

// In index.js
// In index.js
export default function Home() {

  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };


  return (
    <div>
      <main className={styles.main}>
        <div className={styles.app}>
          <Game darkness={darkHandler} />
        </div>
        <About />
      </main>
    </div>
  );
}
