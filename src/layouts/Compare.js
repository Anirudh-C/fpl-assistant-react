import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import PlayerCard from "../components/PlayerCard";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        flexGrow: 1,
        backgroundImage: 'url(https://raw.githubusercontent.com/Anirudh-C/fpl-assistant-react/master/assets/header-pl.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        flexGrow: 1,
        color: "#fff",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
        };
    }

    compareCallback(id, player) {
        if (id === 1) {
            this.setState({ player1: player });
        }
        else {
            this.setState({ player2: player });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
              <AppBar position="static" className={classes.bar}>
                <Toolbar>
                  <Typography variant="h6" align="center" className={classes.title}>
                    Compare
                  </Typography>
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <PlayerCard
                      id={1}
                      name="Name"
                      team="Team"
                      compareCallback={this.compareCallback.bind(this)}
                      other={this.state.player2}/>
                  </Grid>
                  <Grid item xs={6}>
                    <PlayerCard
                      id={2}
                      name="Name"
                      team="Team"
                      compareCallback={this.compareCallback.bind(this)}
                      other={this.state.player1}/>
                  </Grid>
                </Grid>
              </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Compare);
