function Error(props) {
  const containerStyle = {
    position: 'absolute',
    top: '5rem', // approximates top-20
    width: '100%',
    display: 'grid',
    placeItems: 'center',
  };

  const messageStyle = {
    width: 'fit-content', // w-fit
    padding: '0.5rem 2rem', // px-8 py-2
    backgroundColor: '#1F2937', // bg-gray-800
    color: 'white', // text-white
    textAlign: 'center', // text-center
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        {props.children}
      </div>
    </div>
  );
}

export default Error;
