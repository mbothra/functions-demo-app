import {abi, contractAddress, subscriptionId} from "../../constants";
import { Contract } from "alchemy-sdk";
import { ethers } from 'ethers';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// Function to fetch data for a single Pokémon by ID
const getPokemonData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    return {
      value: data.name,
      label: data.name,
      imageUrl: data.sprites.front_default,
    };
  } catch (error) {
    console.error("Failed to fetch Pokémon data", error);
  }
};

export const fetchRandomPokemons = async (count, playerNames) => {
    const promises = [];
    for (let i = 0; i < count; i++) {
      const randomId = getRandomInt(1, 898);
      promises.push(getPokemonData(randomId));
    }
    const pokemons = await Promise.all(promises);
    playerNames.push(...pokemons);
  };

export const getPokemonStats = async (pokemonNameOrId) => {
try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`);
    console.log(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`)
    const data = await response.json();

    // Convert stats array to a key-value format
    const statsObj = data.stats.reduce((acc, curr) => {
        acc[curr.stat.name] = curr.base_stat;
        return acc;
    }, {});

    return statsObj;

} catch (error) {
    console.error("Failed to fetch Pokémon stats", error);
    return null;
}
};

// Usage:
// const stats = await getPokemonStats('pikachu');
// console.log(stats); // { hp: 35, attack: 55, ... }

function hexToString(hex) {
  const rawStr = hex.slice(2);  // remove the "0x" prefix
  let str = '';
  for (let i = 0; i < rawStr.length; i += 2) {
      str += String.fromCharCode(parseInt(rawStr.substr(i, 2), 16));
  }
  return str;
}

export const getPokemonStatsFromConsumer = async (pokemonNameOrId, signer) => {
  try {
      const contract = new Contract(contractAddress, abi, signer)
      const source = ""; // Provide the source as per your use case
      const secretsLocationEnumValue = 0; // replace with the correct enum value. For enums, underlying values are uint8, so use an integer.
      const encryptedSecretsReference = ethers.utils.hexlify(ethers.utils.randomBytes(32)); // replace with the correct encrypted reference or use a random placeholder for now
      const args = [pokemonNameOrId];
      const bytesArgs = [];  // Empty since you said you don't want to pass it
      const callbackGasLimit = ethers.BigNumber.from("25000000"); // Make sure it's a uint32
      const subId = ethers.BigNumber.from(subscriptionId); // Make sure it's a uint64

      // Calling the sendRequest function
      const tx = await contract.sendRequestNew(
        source,
        args,
        subId,
      );
      console.log("1")

      // If you want to wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("2")

      console.log(receipt)
      // Get the request ID from the contract's state
      const requestId = await contract.s_lastRequestId();

      const waitForDataReceivedEvent = new Promise((resolve, reject) => {
        contract.on("DataReceived", (eventRequestId, response, error) => {
          console.log("Received");
          if (eventRequestId === requestId) { // Match the requestId
            console.log("Request ID:", eventRequestId);
            console.log("Response:", response);
            console.log("Error:", error);
            // Handle the response as needed
            // ...
            const decodedResponse = hexToString(response)
            const decodedResponseJSON = JSON.parse(decodedResponse);

            // Resolve the promise with the event data
            resolve(decodedResponseJSON);

          }
        });
      });

      // Wait for the event to be received
      const eventData = await waitForDataReceivedEvent;
      return eventData
  } catch (error) {
      console.error("Failed to fetch Pokémon stats", error);
      return null;
  }
  };
  
  // export const battleOnSmartContract = async (pokemonNameOrId, signer) => {
  //   try {
  //       const contract = new Contract(contractAddress, abi, signer)
  //       const source = ""; // Provide the source as per your use case
  //       const secretsLocationEnumValue = 0; // replace with the correct enum value. For enums, underlying values are uint8, so use an integer.
  //       const encryptedSecretsReference = ethers.utils.hexlify(ethers.utils.randomBytes(32)); // replace with the correct encrypted reference or use a random placeholder for now
  //       const args = [pokemonNameOrId];
  //       const bytesArgs = [];  // Empty since you said you don't want to pass it
  //       const callbackGasLimit = ethers.BigNumber.from("25000000"); // Make sure it's a uint32
  //       const subId = ethers.BigNumber.from(subscriptionId); // Make sure it's a uint64
  
  //       // Calling the sendRequest function
  //       const tx = await contract.sendRequestNew(
  //         source,
  //         args,
  //         subId,
  //       );
  //       console.log("1")
  
  //       // If you want to wait for the transaction to be mined
  //       const receipt = await tx.wait();
  //       console.log("2")
  
  //       console.log(receipt)
  //       // Get the request ID from the contract's state
  //       const requestId = await contract.s_lastRequestId();
  
  //       const waitForDataReceivedEvent = new Promise((resolve, reject) => {
  //         contract.on("DataReceived", (eventRequestId, response, error) => {
  //           console.log("Received");
  //           if (eventRequestId === requestId) { // Match the requestId
  //             console.log("Request ID:", eventRequestId);
  //             console.log("Response:", response);
  //             console.log("Error:", error);
  //             // Handle the response as needed
  //             // ...
  //             const decodedResponse = hexToString(response)
  //             const decodedResponseJSON = JSON.parse(decodedResponse);
  
  //             // Resolve the promise with the event data
  //             resolve(decodedResponseJSON);
  
  //           }
  //         });
  //       });
  
  //       // Wait for the event to be received
  //       const eventData = await waitForDataReceivedEvent;
  //       return eventData
  //   } catch (error) {
  //       console.error("Failed to fetch Pokémon stats", error);
  //       return null;
  //   }
  //   };