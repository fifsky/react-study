import React from 'react'

const FooContext = React.createContext("light")

class Context extends React.Component {
  render() {
    return (
    <FooContext.Provider value="dark">
      <FooButton />
    </FooContext.Provider>
    )
  };
}

function FooButton(props) {
  return (
    <FooContext.Consumer>
      {value => {
        return (
          <p>{value}</p>
        )
      }}
    </FooContext.Consumer>
  );
}

export default Context
