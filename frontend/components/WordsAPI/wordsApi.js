import {abi, contractAddress, subscriptionId} from "../../constants";
import { Contract } from "alchemy-sdk";
import { ethers } from 'ethers';

function hexToString(hex) {
    const rawStr = hex.slice(2);  // remove the "0x" prefix
    let str = '';
    for (let i = 0; i < rawStr.length; i += 2) {
        str += String.fromCharCode(parseInt(rawStr.substr(i, 2), 16));
    }
    return str;
  }
  

export const getRandomWord = async (signer) => {
    try {
        const contract = new Contract(contractAddress, abi, signer)
        const subId = ethers.BigNumber.from(subscriptionId); // Make sure it's a uint64
        const tx = await contract.sendRequest(
            subId,
            []
          );
        const receipt = await tx.wait();
        const requestId = await contract.s_lastRequestId();
        const waitForDataReceivedEvent = new Promise((resolve, reject) => {
            contract.on("Response", (eventRequestId, word, response, error) => {
              if (eventRequestId === requestId) { // Match the requestId
                console.log("Request ID:", eventRequestId);
                console.log("Response:", response);
                console.log("Error:", error);
                // Handle the response as needed
                // ...
                const decodedResponse = hexToString(response)
    
                // Resolve the promise with the event data
                resolve(decodedResponse);
    
              }
            });
          });
        const eventData = await waitForDataReceivedEvent;
        return eventData
    } catch (error) {
      console.error("Failed to fetch Word", error);
    }
  };
  