import { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const keyboard = {
  line1: "QWERTYUIOP",
  line2: "ASDFGHJKL",
  line3: "ZXCVBNM",
};

let defaultLetters = {};

"abcdefjhijklmnopqrstuvwxyz".split("").forEach((letter) => {
  defaultLetters[letter] = "";
});

function Key(props) {
  const [keyStyle, setKeyStyle] = useState({
    backgroundColor: '#375bd2', // default bg color
    // Pseudo-classes like :hover can't be used in inline styles
  });

  const xStyles = props.value.length === 1 ? { width: '1.75rem' } : { padding: '0.5rem' };
  const returnKey = () => {
    props.getKey(props.value);
  };

  useEffect(() => {
    // Apply color changes based on the key state
    setKeyStyle(prevState => ({
      ...prevState,
      backgroundColor: props.state === "C" ? '#22C55E' : // Correct
                        props.state === "E" ? '#F59E0B' : // Exist
                        props.state === "N" ? '#EF4444' : // Wrong
                        props.value === "ENTER" ? 'gray' : // Specific color for Enter
                        props.value === "DEL" ? '#fb7185' : // Specific color for Backspace
                        '#375bd2', // Default
    }));
  }, [props.state, props.value]);

  const combinedStyles = {
    ...xStyles,
    ...keyStyle,
    height: '3.5rem', // h-14
    display: 'grid',
    alignItems: 'center',
    borderRadius: '0.375rem', // rounded
    fontWeight: '600', // font-semibold
    cursor: 'pointer',
    margin: '0.125rem', // margin for gap-1
  };

  const handleKeyPress = () => {
    props.getKey(props.value);
  };

  return (
    <button style={combinedStyles} onClick={handleKeyPress}>
      {props.value === "DEL" ? <BackspaceIcon /> : props.value}
    </button>
  );
}

function KeyBoard(props) {
  const [letters, setletters] = useState(defaultLetters);
  useEffect(() => {
    setletters(props.letters);
  }, [props.changed]);

  const keyHandler = (value) => {
    props.keyHandler(value);
  };

  const keyboardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', // w-100
    marginTop: '-40px'
  };

  const rowStyles = {
    display: 'flex',
    gap: '0.25rem', // gap-1
    margin: '0.125rem 0', // my-0.5
    width: 'fit-content', // w-fit
    fontFamily: 'circular',
    color:'white',
  };

  return (
    <div style={keyboardStyles}>
      <div style={rowStyles}>
        {keyboard.line1.split("").map((value, key) => (
          <Key
            getKey={keyHandler}
            value={value}
            key={key}
            state={letters[value]}
          />
        ))}
      </div>
      <div style={rowStyles}>
        {keyboard.line2.split("").map((value, key) => (
          <Key
            getKey={keyHandler}
            value={value}
            key={key}
            state={letters[value]}
          />
        ))}
      </div>
      <div style={rowStyles}>
        <Key value="ENTER" getKey={keyHandler} />
        {keyboard.line3.split("").map((value, key) => (
          <Key
            getKey={keyHandler}
            value={value}
            key={key}
            state={letters[value]}
          />
        ))}
        <Key value="DEL" getKey={keyHandler} />
      </div>
    </div>
  );
}

export default KeyBoard;
