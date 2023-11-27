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
        if (!signer) {
            return "Error";
        }

        const contract = new Contract(contractAddress, abi, signer);
        const subId = ethers.BigNumber.from(subscriptionId);
        const tx = await contract.sendRequest(subId, []);
        await tx.wait();

        const requestId = await contract.s_lastRequestId();

        const waitForDataReceivedEvent = new Promise((resolve, reject) => {
            contract.on("Response", (eventRequestId, word, response, error) => {
                if (eventRequestId === requestId) {
                    const decodedResponse = hexToString(response);
                    resolve(decodedResponse);
                }
            });
        });

        const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => resolve("Error"), 60000); // 60 seconds timeout
        });

        // Race between our event and the timeout
        const eventData = await Promise.race([waitForDataReceivedEvent, timeoutPromise]);
        
        if (eventData === "Error") {
            console.log("Event listener timed out.");
            return "Error";
        }

        return eventData;
    } catch (error) {
        console.error("Failed to fetch Word", error);
        return "Error";
    }
};
