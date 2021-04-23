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

import Login from "./layouts/Login";
import Home from "./layouts/Home";
import Compare from "./layouts/Compare";
import Picks from "./layouts/Picks";
import ErrorDialog from "./components/ErrorDialog";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            errorDialog: false,
            errorText: ""
        };
    }

    handleLogin(response) {
        if (response.ok) {
            this.setState({ loggedIn : true });
        }
        else {
            this.setState({ errorDialog: true, errorText: response.statusText });
        }
    }

    handleLogout() {
        this.setState({ loggedIn : false });
    }

    handleErrorClose() {
        this.setState({ errorDialog: false, errorText: "" });
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
                    <Route path="/picks">
                      <Picks />
                    </Route>
                    <Route path="/compare">
                      <Compare />
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
