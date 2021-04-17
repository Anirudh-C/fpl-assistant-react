import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    main: {
        flexGrow: 1,
        backgroundImage: 'url(https://raw.githubusercontent.com/Anirudh-C/fpl-assistant-react/master/assets/header-pl.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    title: {
        flexGrow: 1,
        color: "#37003c",
    },
    link: {
        color: "#37003c",
        textDecoration: "none"
    },
});

class Home extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static" className={classes.main}>
              <Toolbar>
                <Typography variant="h6" align="center" className={classes.title}>
                  Fantasy Premier League Assistant
                </Typography>
                {
                    this.props.login ?
                        <Button onClick={this.props.logoutCallback} color="inherit">
                          <Link to="/" className={classes.link}>
                            Logout
                          </Link>
                        </Button>
                    :
                    <Button color="inherit">
                      <Link to="/login" className={classes.link}>
                        Login
                      </Link>
                    </Button>
                }
              </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Home);
