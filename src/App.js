import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Cookies from "js-cookie";

import Login from "./Login";
import Home from "./Home";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    handleLogin(status) {
        this.setState({ loggedIn : true });
    }

    handleLogout() {
        this.setState({ loggedIn : false });
        Cookies.remove("key");
    }

    render() {
        return (
            <Router>
              <div>
                <Switch>
                  <Route path="/login">
                    <Login loginCallback={this.handleLogin.bind(this)}/>
                  </Route>
                  <Route path="/">
                    <Home login={this.state.loggedIn} logoutCallback={this.handleLogout.bind(this)}/>
                  </Route>
                </Switch>
              </div>
            </Router>
        );
    }
}

export default App;
