import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom'

import './app.css';

// Internal
import Routing from 'configs/routing'

class App extends Component {


  render() {
    return (
      <div className="App">
        <Routing/>
      </div>
    );
  }
}

export default withRouter(App);
