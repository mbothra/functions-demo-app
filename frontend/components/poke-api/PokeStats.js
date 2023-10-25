import React, { useState, useEffect } from 'react';
import { getPokemonStats, getPokemonStatsFromConsumer } from './pokeApi';
import { useSigner } from "wagmi";



const PokeStats = ({ pokemonId, pokemonSelected }) => {
    // Styles for the wrapper
    const wrapperStyle = {
        marginTop: '20px',
        textAlign: 'left',
        fontFamily: 'pokemon'
    };

    const statsMap = {
        'attack': 'a',
        'defense': 'd',
        'hp': 'h',
        'special-attack': 'sa',
        'special-defense': 'sd',
        'speed': 's'
      };


      function transformStats(stats) {
        const transformed = {};
      
        for (let [longForm, shortForm] of Object.entries(statsMap)) {
          for (let [key, value] of Object.entries(stats)) {
            if (shortForm === key) {
              transformed[longForm] = value;
            }
          }
        }
      
        return transformed;
      }

    const { data: signer } = useSigner();

    // Styles for the h4 tags
    const headerStyle = {
        marginBottom: '10px',
    };

    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    useEffect(() => {
        async function fetchStats() {
            if (!pokemonId) return; // Don't run if pokemonId is null or undefined
            setIsLoading(true);  // Set loading state to true before fetching

            const fetchedStats = await getPokemonStatsFromConsumer(pokemonId, signer);
            console.log("fetchedStats",transformStats(fetchedStats))
            setStats(transformStats(fetchedStats));
            setIsLoading(false);  // Set loading state to false after fetching is complete
        }
        fetchStats();
    }, [pokemonId]); // This will re-run the effect if pokemonId changes

    return (
        <div className="container h-100">
            {(pokemonSelected || isLoading) && (
            <div className="statsBox">
                <h4 className="statsTitle">
                    {pokemonSelected && "Pokemon Stats:"}
                </h4>
                <div style={wrapperStyle}>
                {isLoading ? (
                    <div className="spinner-wrapper">
                        <div className="spinner"></div>
                        <div className="spinner-text">Getting Live {pokemonId} stats through chainlink functions...</div>
                    </div>
                ) : (
                    stats && Object.entries(stats).map(([key, value], index) => {
                        return (
                            <h4 key={index} className="statsEntry">
                                {key.toUpperCase()} : {value}
                            </h4>
                        );
                    })
                )}
                </div>
            </div>)}
        </div>

    );
};

export default PokeStats;