import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Cookies from "js-cookie";

import {
    withStyles,
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';

const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#37003c",
        },
        secondary: {
            main: "#00ff87",
        },
    },
});

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
            <ThemeProvider theme={appTheme}>
              <Router>
                <div>
                  <Switch>
                    <Route path="/login">
                      <Login loginCallback={this.handleLogin.bind(this)}/>
                    </Route>
                    <Route path="/">
                      <Home login={this.state.loggedIn} logoutCallback={this.handleLogout.bind(this)}/>
                      <ErrorDialog
                        visible={this.state.errorDialog}
                        text={this.state.errorText}
                        handleClose={this.handleErrorClose.bind(this)}/>
                    </Route>
                  </Switch>
                </div>
              </Router>
            </ThemeProvider>
        );
    }
}

export default App;
