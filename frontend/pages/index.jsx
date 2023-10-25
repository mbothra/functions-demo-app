import styles from "../styles/Home.module.css";
import '@chainlink/design-system/global-styles.css';
import PokemonBattle from "../components/PokemonBattle";
import About from '../components/About';
import PokeStats from "../components/poke-api/PokeStats";
import React, { useState } from 'react';

// In index.js
// In index.js
export default function Home() {

  const [playerSelected, setPlayerSelected] = useState(null);
  const [enemySelected, setEnemySelected] = useState(null);
  const [playerPokemonSelected, setPlayerPokemonSelected] = useState(false);
  const [enemyPokemonSelected, setEnemyPokemonSelected] = useState(false);


  return (
    <div>
      <main className={styles.main}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <PokeStats pokemonId={playerSelected} pokemonSelected={playerPokemonSelected}/>
            <PokemonBattle onPlayerSelected={(id) => {setPlayerSelected(id); setPlayerPokemonSelected(true);}} onEnemySelected={(id) => {setEnemySelected(id); setEnemyPokemonSelected(true)}}/>
            <PokeStats pokemonId={enemySelected} pokemonSelected={enemyPokemonSelected}/>
        </div>
        <div className="w-full max-w-[1440px] px-4 lg:px-8 pt-4 mx-auto">
          <About />
        </div>
      </main>
    </div>
  );
}
