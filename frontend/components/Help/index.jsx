function Box(props) {
  let style = {
    color: 'black', // text-black
    border: '2px solid #D1D5DB', // border-2 border-gray-300
    display: 'grid',
    placeItems: 'center',
    padding: '0', // p-0
    margin: '0', // m-0
    fontWeight: 'bold', // font-bold
    fontSize: '1.25rem', // text-lg sm:text-2xl
    width: '2rem', // w-8 sm:w-10
    height: '2rem', // h-8 sm:h-10
  };

  // Conditional styles based on props.state
  if (props.state === "C") {
    style.backgroundColor = '#10B981'; // bg-emerald-500
    style.color = 'white'; // text-white
  }
  if (props.state === "E") {
    style.backgroundColor = '#F59E0B'; // bg-amber-500
    style.color = 'white'; // text-white
  }
  if (props.state === "N") {
    style.backgroundColor = '#71717A'; // bg-zinc-500
    style.color = 'white'; // text-white
  }

  return <div style={style}>{props.value}</div>;
}

function Help() {
  const paragraphStyle = {
    textAlign: 'left',
    fontSize: '0.875rem', // text-sm sm:text-base
    paddingTop: '1.25rem', // py-5
    paddingBottom: '1.25rem', // py-5
    fontWeight: '400', // font-regular
    opacity: '1', // increased from 0.75 to 1 for better visibility
    marginRight: '0.25rem', // mr-1
    color: 'black', // ensure this contrasts with the background color
    lineHeight: '1.5', // add line height for better readability
  };

  const titleStyle = {
    textAlign: 'left',
    fontWeight: 'bold', // font-bold
    paddingTop: '1.25rem', // py-5
    paddingBottom: '1.25rem', // py-5
    fontSize: '1.125rem', // Add font size for h3 if needed
    color: 'black', // ensure this contrasts with the background color
  };

  const boxContainerStyle = {
    display: 'flex',
    gap: '0.25rem', // gap-1
  };

  const hrStyle = {
    border: '0',
    height: '1px',
    backgroundColor: '#d1d5db', // color similar to Tailwind's gray-300
    marginTop: '0.5rem', // add some margin at the top
    marginBottom: '0.5rem', // add some margin at the bottom
  };
  
  return (
    <>
      <p style={paragraphStyle}>
        Guess the WORDLE in six tries.
        <br />
        Each guess must be a valid five-letter word. Hit the enter button to
        submit.
        <br /> After each guess, the color of the tiles will change to show how
        close your guess was to the word.
      </p>
      <hr />
      <h3 style={titleStyle}>Examples</h3>
      <div style={boxContainerStyle}>
        <Box value="S" state="C" />
        <Box value="W" />
        <Box value="E" />
        <Box value="A" />
        <Box value="T" />
      </div>
      <p style={paragraphStyle}>
        The letter <b>S</b> is in the word and in the correct spot.
      </p>
      <div style={boxContainerStyle}>
        <Box value="N" />
        <Box value="U" />
        <Box value="M" state="E" />
        <Box value="B" />
        <Box value="S" />
      </div>
      <p style={paragraphStyle}>
        The letter <b>M</b> is in the word and in the correct spot.
      </p>
      <div style={boxContainerStyle}>
        <Box value="F" />
        <Box value="L" state="N" />
        <Box value="A" />
        <Box value="T" />
        <Box value="S" />
      </div>
      <p style={paragraphStyle}>
        The letter <b>L</b> is in the word but in the wrong spot.
      </p>
    </>
  );
}

export default Help;
