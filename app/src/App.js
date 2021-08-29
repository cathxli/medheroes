import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Profile from './Profile';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import EditReward from './EditReward';
import EditAvatar from './EditAvatar';

class App extends Component {

  render() {
    return (
      <BrowserRouter>

      <Switch>
        <Route exact path = "/" component ={Login} />
        <Route exact path = "/signup" component ={Signup} />
        <Route exact path = "/home" component ={Home} />
        <Route exact path = "/profile" component ={Profile} />
        <Route exact path = "/edit-reward" component ={EditReward} />
        <Route exact path = "/edit-avatar" component = {EditAvatar}/>
      </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
