import React, { Component } from 'react';

import './app.css';

// Internal
import Header from 'components/Header'
import Routing from 'configs/routing'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <Routing/>
      </div>
    );
  }
}

export default App;
