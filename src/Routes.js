import React, {Component} from 'react';

import { Router, Scene, Stack} from 'react-native-router-flux';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/MainApp';
import Screen1 from './pages/Screen1';

export default class Routes extends Component<{}> {
  render () {
    return (

      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="signup" component={SignUp} title="SignUp" />
          <Scene key="mainapp" component={Home} title="MainApp" />
          <Scene key="screen1" component={Screen1} title="Screen1" />
        </Stack>
      </Router>
    )
  }
}