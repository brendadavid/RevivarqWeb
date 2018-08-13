import React, { Component } from 'react';
import './App.css';

// Internal
import Header from 'components/Header'

const showProps = (props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        {showProps(this.props)}
      </div>
    );
  }
}

export default App;
