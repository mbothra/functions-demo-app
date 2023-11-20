import { useEffect, useState } from "react";
import Box from "../Box";
import words from "../../words";
import {getRandomWord} from '../WordsAPI/wordsApi' 
import { useSigner } from "wagmi";

const c =
  words[Math.floor(Math.random() * words.length - 1)].toUpperCase();
// let correct = getRandomWord()
let defaulBoard = [];
let defaultLetters = [];

"abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
  defaultLetters[i] = "";
});

for (let i = 0; i < 5; i++) {
  defaulBoard.push([]);
  for (let j = 0; j < 5; j++) {
    defaulBoard[i].push(["", ""]);
  }
}

function Board(props) {
  const { data: signer } = useSigner();
  console.log("getRandomWord()", getRandomWord(signer))
  const [letters, setLetters] = useState(defaultLetters);
  const [board, setBoard] = useState(defaulBoard);
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState(c);

  useEffect(() => {
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
                if (words.includes(word.toLowerCase())) {
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
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters);
  }, [changed]);
  
  // Initialize default board and letters
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    let newBoard = [];
    let newLetters = {};

    "abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
      newLetters[i] = "";
    });

    for (let i = 0; i < 5; i++) {
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
    setCorrect(getRandomWord());
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
      <button onClick={resetGame}>Reset Word</button>
      <div style={messageStyles}>
        {lost || win ? message : ""}
      </div>
    </div>
  );
}

export default Board;
