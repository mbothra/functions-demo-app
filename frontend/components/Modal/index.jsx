import CloseIcon from "@mui/icons-material/Close";

function Modal(props) {
  // Outermost container style
  const outerContainerStyle = {
    position: 'fixed', // fixed instead of absolute to cover the entire screen
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    zIndex: '10', // Ensure the modal is above other content
  };

  // Modal style
  const modalStyle = {
    position: 'relative',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    padding: '1.25rem',
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    color: 'black', // Ensure text is visible against the white background
    maxWidth: '600px',
    width: '90vw',
    maxHeight: '580px',
    height: '80vh',
    overflowY: 'auto', // Allow content to scroll if necessary
  };

  // Header style
  const headerStyle = {
    display: 'flex',
    justifyContent: 'flex-end', // Close icon should be at the end
    alignItems: 'center',
    paddingBottom: '1.25rem',
  };

  // Title style
  const titleStyle = {
    fontWeight: '900',
    fontSize: '1.5rem',
    flexGrow: '1', // Allow the title to take up the available space
  };

  return (
    <div style={outerContainerStyle}>
      {/* The overlay has been removed */}
      <div style={modalStyle}>
        <div style={headerStyle}>
          <CloseIcon style={{ color: 'black', cursor: 'pointer' }} onClick={() => props.help(false)} />
        </div>
        <h2 style={titleStyle}>{props.title}</h2>
        <div style={{ color: 'black' }}>{props.children}</div> {/* This div wraps the content with a defined text color */}
      </div>
    </div>
  );
}

export default Modal;
