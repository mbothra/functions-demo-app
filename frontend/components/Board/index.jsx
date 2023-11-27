import { useEffect, useState } from "react";
import Box from "../Box";
import words from "../../words";
import {getRandomWord} from '../WordsAPI/wordsApi' 
import { useSigner } from "wagmi";
import TransactionModal from '../TransactionModal'; // Adjust the import path as needed
import axios from 'axios';

const checkDictionary = async (word) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.data.length > 0; // Returns true if the word exists
  } catch (error) {
    console.error("Error checking dictionary", error);
    return false;
  }
};

const c =
  words[Math.floor(Math.random() * words.length - 1)].toUpperCase();
// let correct = getRandomWord()
let defaulBoard = [];
let defaultLetters = [];

"abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
  defaultLetters[i] = "";
});

for (let i = 0; i < 6; i++) {
  defaulBoard.push([]);
  for (let j = 0; j < 5; j++) {
    defaulBoard[i].push(["", ""]);
  }
}

function Board(props) {
  const { data: signer } = useSigner();
  const [letters, setLetters] = useState(defaultLetters);
  const [board, setBoard] = useState(defaulBoard);
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState(c);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInput = async() => {
    if (win || lost) {
      console.log("Game ended!");
    } else {
      if (props.clicks !== 0) {
        if (props.letter === "DEL") {
          setCol(col === 0 ? 0 : col - 1);
          setBoard((prevBoard) => {
            prevBoard[row][col === 0 ? 0 : col - 1][0] = "";
            return prevBoard;
          });
        } else {
          setBoard((prevBoard) => {
            if (col < 5) {
              if (props.letter !== "ENTER") {
                prevBoard[row][col][0] = props.letter;
                setCol(col + 1);
              } else {
                props.error("Words are 5 letters long!");
                setTimeout(() => {
                  props.error("");
                }, 1000);
              }
            } else {
              if (props.letter === "ENTER") {
                let correctLetters = 0;
                let word = "";
                for (let i = 0; i < 5; i++) {
                  word += prevBoard[row][i][0];
                }
                const isValidWord = checkDictionary(word.toLowerCase());
                if (isValidWord) {
                  for (let i = 0; i < 5; i++) {
                    if (correct[i] === prevBoard[row][i][0]) {
                      prevBoard[row][i][1] = "C";
                      correctLetters++;
                    } else if (correct.includes(prevBoard[row][i][0]))
                      prevBoard[row][i][1] = "E";
                    else prevBoard[row][i][1] = "N";
                    setRow(row + 1);
                    if (row === 5) {
                      setLost(true);
                      setTimeout(() => {
                        setMessage(`It was ${correct}`);
                      }, 750);
                    }

                    setCol(0);
                    setLetters((prev) => {
                      prev[board[row][i][0]] = board[row][i][1];
                      return prev;
                    });
                  }
                  setChanged(!changed);

                  if (correctLetters === 5) {
                    setWin(true);
                    setTimeout(() => {
                      setMessage("You WIN");
                    }, 750);
                  }
                  return prevBoard;
                } else {
                  props.error("Word not in dictionary");
                  setTimeout(() => {
                    props.error("");
                  }, 1000);
                }
              }
            }
            return prevBoard;
          });
        }
      }
    }
  }


  useEffect(() => {
    if (!win && !lost && props.clicks !== 0) {
      handleInput();
    }  
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters);
  }, [changed]);
  
  // Initialize default board and letters
  // useEffect(() => {
  //   resetGame();
  // }, []);

  const resetGame = async () => {
    setModalOpen(true); // Open the modal before starting the API call

    try {
      let newCorrectWord = await getRandomWord(signer);
      if(newCorrectWord == 'Error') {
        newCorrectWord =words[Math.floor(Math.random() * words.length - 1)].toUpperCase()
      }

      setCorrect(newCorrectWord);
      // Reset the game state
      let newBoard = [];
      let newLetters = {};
      "abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
        newLetters[i] = "";
      });
      for (let i = 0; i < 6; i++) {
        newBoard.push([]);
        for (let j = 0; j < 5; j++) {
          newBoard[i].push(["", ""]);
        }
      }
      setBoard(newBoard);
      setLetters(newLetters);
      setRow(0);
      setCol(0);
      setWin(false);
      setLost(false);
      setMessage("");
    } catch (error) {
      console.error("Failed to reset game", error);
    }

    setModalOpen(false); // Close the modal after the API call is complete
  };


  const containerStyles = {
    padding: '20px 40px', // equivalent to px-10 py-5
    display: 'grid',
    gap: '4px', // equivalent to gap-y-1
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  };

  const rowStyles = {
    display: 'flex',
    gap: '4px', // equivalent to gap-1
    width: 'fit-content'
  };

  const messageStyles = {
    display: 'grid',
    placeItems: 'center',
    height: '32px', // equivalent to h-8
    fontWeight: 'bold',
    color: 'white' // equivalent to dark:text-white (assuming you are using a dark theme)
  };

  const buttonStyles = {
    backgroundColor: '#4CAF50', // Green background
    color: 'white', // White text
    padding: '10px 20px', // Padding around the text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Cursor changes to a hand icon when hovered over
    fontSize: '16px', // Font size
    margin: '20px 0 0 0px', // Margin above and below the button
    transition: 'background-color 0.3s', // Smooth transition for the background color
    fontFamily: 'circular',
    textAlign: 'center',
    display: 'flex', // Enables Flexbox
    flexDirection: 'column', // Stacks children vertically
    alignItems: 'center', // Centers children horizontally in the container
    justifyContent: 'center', // Centers children vertically in the container
  
  };
  function handleMouseOver(e) {
    e.target.style.backgroundColor = '#45a049'; // Darker shade of green when hovered
  }
  
  function handleMouseOut(e) {
    e.target.style.backgroundColor = '#4CAF50'; // Original green color when not hovered
  }
  
  return (
    <div style={containerStyles}>
      {board.map((rowArr, key) => {
        return (
          <div key={key} style={rowStyles}>
            {rowArr.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        );
      })}
    <button 
      onClick={resetGame} 
      style={buttonStyles} 
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
    >
      Set Word
    </button>
      <div style={messageStyles}>
        {lost || win ? message : ""}
      </div>
      <TransactionModal open={modalOpen} message="Calling random-word-api using Chainlink Functions" />
    </div>
  );
}

export default Board;
