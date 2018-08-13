import React, { Component } from 'react';

import './app.css';

// Internal
import Header from 'components/Header'
import Routing from 'configs/routing'

const stringify = (props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <Routing/>
        {stringify(this.props)}
      </div>
    );
  }
}

export default App;
