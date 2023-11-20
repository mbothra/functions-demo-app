import { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

function Box(props) {
  // Define the base styles for the box
  const baseStyles = {
    display: 'grid',
    placeItems: 'center',
    width: '48px', // equivalent to w-12
    height: '48px', // equivalent to h-12
    padding: 0,
    margin: 0,
    fontSize: '24px', // equivalent to text-2xl
    fontWeight: 'bold',
    borderRadius: '0.125rem', // equivalent to rounded-sm
    borderWidth: '2px',
    borderColor: '#D1D5DB', // equivalent to border-gray-300
    backgroundColor: '#E2E8F0', // default bg color
    color: 'black', // equivalent to text-black
  };

  // Update state based on the props
  useEffect(() => {
    const timer = setTimeout(() => {
      // Use inline styles for different states
      if (props.state === "C") {
        setState({
          ...baseStyles,
          backgroundColor: '#22C55E', // bg-correct
          color: 'white',
        });
      }
      if (props.state === "E") {
        setState({
          ...baseStyles,
          backgroundColor: '#FACC15', // bg-exist
          color: 'white',
        });
      }
      if (props.state === "N") {
        setState({
          ...baseStyles,
          backgroundColor: '#F87171', // bg-wrong
          color: 'white',
        });
      }
    }, 125 * props.pos);

    return () => clearTimeout(timer);
  }, [props.state, props.pos]);

  // Initialize state with the base styles
  const [state, setState] = useState(baseStyles);

  // Render the box with inline styles
  return (
    <div style={state}>
      {props.value === "DEL" ? <BackspaceIcon /> : props.value}
    </div>
  );
}

export default Box;
