import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import Login from "./Login";
import Home from "./Home";

class App extends React.Component {
    handleLogin(login, password) {
        console.log(login);
        console.log(password);
    }

    render() {
        return (
            <Router>
              <div>
                <Switch>
                  <Route path="/login">
                    <Login loginCallback={this.handleLogin}/>
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
        );
    }
}

export default App;
