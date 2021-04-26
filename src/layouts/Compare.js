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
            players: [null, null],
            scoreColours: ["#37003c", "#37003c"],
        };
        this.defaultPlayer = {
            id: 0,
            full_name: "Name",
            team_id: -1,
            score: "0",
            goals: 0,
            assists: 0,
        };
    }

    setColours(player1, player2) {
        if (player1 && player2) {
            this.setState({
                scoreColours:
                [
                    player1.score > player2.score ?
                        "#00ff87" : "#fc045c",
                    player1.score > player2.score ?
                        "#fc045c": "#00ff87"
                ]
            });
        }
        else {
            this.setState({
                scoreColours: ["#37003c", "#37003c"]
            });
        }
    }

    compareCallback(id, player) {
        if (id === 1) {
            this.setState({
                players: [player, this.state.players[1]]
            });
            this.setColours(player, this.state.players[1]);
        }
        else {
            this.setState({
                players: [this.state.players[0], player]
            });
            this.setColours(this.state.players[0], player);
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
                  <Grid item xs={12} md={6}>
                    <PlayerCard
                      id={1}
                      defaultPlayer={this.defaultPlayer}
                      compareCallback={this.compareCallback.bind(this)}
                      scoreColour={this.state.scoreColours[0]}
                      showStats={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PlayerCard
                      id={2}
                      defaultPlayer={this.defaultPlayer}
                      compareCallback={this.compareCallback.bind(this)}
                      scoreColour={this.state.scoreColours[1]}
                      showStats={true}
                    />
                  </Grid>
                </Grid>
              </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Compare);
