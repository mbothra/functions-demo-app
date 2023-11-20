import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Settings from "../Settings";

function NavBar(props) {
  const navBarStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.25rem', // pt-5
    paddingBottom: '0.75rem', // py-3
    textAlign: 'center',
    color: 'black', // text-black
    // Add a dark mode color if necessary
  };

  const titleStyle = {
    fontSize: '1.875rem', // text-3xl
    fontWeight: 'bold',
    letterSpacing: '.25rem', // tracking-wider
    fontFamily: 'circular'
  };

  // If a dark mode is active, change the color
  if (props.dark) {
    navBarStyle.color = 'white'; // dark:text-white
  }

  return (
    <div style={navBarStyle}>
      <HelpOutlineIcon
        onClick={() => {
          props.help(true);
        }}
        // If you have specific styles for this icon, add them here
      />
      <h1 style={titleStyle}>Functions WODL</h1>
      <Settings darkness={props.darkness} dark={props.dark} />
    </div>
  );
}

export default NavBar;
