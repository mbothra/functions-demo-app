import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Switch } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

function Settings(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = () => {
    props.darkness(!props.dark);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define the inline styles here
  const settingsIconStyle = {
    color: props.dark ? 'white' : 'black', // Toggles color based on dark mode
  };

  const formControlLabelStyle = {
    paddingLeft: '0.875rem', // Equivalent to pl-3.5
    color: '#718096', // Equivalent to text-slate-600
  };

  const linkContainerStyle = {
    display: 'flex',
    justifyContent: 'around',
    paddingTop: '0.5rem', // Equivalent to pt-2
  };

  return (
    <div>
      <SettingsIcon
        onClick={handleClick}
        style={settingsIconStyle}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FormControlLabel
          style={formControlLabelStyle}
          control={<Switch onChange={handleChange} />}
          label="Dark mode"
        />
        <hr />
        <div style={linkContainerStyle}>
          <a href="https://github.com/MahmoudFettal/wordle" style={{ display: 'flex' }}>
            <GitHubIcon />
          </a>
          <a href="https://twitter.com/mahmoudfettal" style={{ display: 'flex' }}>
            <TwitterIcon />
          </a>
        </div>
      </Menu>
    </div>
  );
}

export default Settings;