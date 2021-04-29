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
        this.stats = [
            {
                key: "goals_scored",
                text: ["Goals: ", ""],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "assists",
                text: ["Assists: ", ""],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "clean_sheets",
                text: ["Clean Sheets: ", ""],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "now_cost",
                text: ["Price: ", "m"],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "points_per_game",
                text: ["Avg Points: ", ""],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "bonus",
                text: ["Bonus: ", ""],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "strength",
                text: ["Team Form: ", "/5"],
                colour: "rgba(255, 255, 255, 0)",
            },
            {
                key: "chance_of_playing_next_round",
                text: ["Playing Chance: ", "%"],
                colour: "rgba(255, 255, 255, 0)",
            },
        ];

        this.defaultPlayer = {
            id: 0,
            full_name: "Name",
            team_name: "Team",
            score: "0.0",
        };

        this.state = {
            players: [ this.defaultPlayer, this.defaultPlayer ],
            scoreColours: ["#37003c", "#37003c"],
            stats: [ this.stats, this.stats ]
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({ players: this.props.location.state });
            this.setColours(this.props.location.state[0], this.props.location.state[1]);
        }
    }

    setColours(player1, player2) {
        if (player1 && player2) {
            if (player1.id !== 0 && player2.id !== 0) {
                let stats1 = [];
                let stats2 = [];
                this.stats.forEach(
                    (stat, i) =>
                        {
                            if (player1[stat.key] > player2[stat.key]) {
                                stats1.push({
                                    key: stat.key,
                                    text: stat.text,
                                    colour: "rgba(0, 255, 135, 0.1)"
                                });
                                stats2.push({
                                    key: stat.key,
                                    text: stat.text,
                                    colour: "rgba(252, 4, 92, 0.1)"
                            });
                            }
                            else if (player1[stat.key] < player2[stat.key]) {
                                stats2.push({
                                    key: stat.key,
                                    text: stat.text,
                                    colour: "rgba(0, 255, 135, 0.1)"
                                });
                                stats1.push({
                                    key: stat.key,
                                    text: stat.text,
                                    colour: "rgba(252, 4, 92, 0.1)"
                                });
                            }
                            else {
                                stats1.push(this.stats[i]);
                                stats2.push(this.stats[i]);
                            }
                        });

                let colour1 = "";
                let colour2 = "";
                if (player1.score > player2.score) {
                    colour1 = "#00ff87";
                    colour2 = "#fc045c";
                }
                else if (player1.score < player2.score) {
                    colour2 = "#00ff87";
                    colour1 = "#fc045c";
                }
                this.setState({
                    scoreColours: [ colour1, colour2 ],
                    stats: [ stats1, stats2 ],
                });
            }
        }
        else {
            this.setState({
                scoreColours: ["#37003c", "#37003c"],
                stats: [ this.stats, this.stats ]
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
                      defaultPlayer={this.state.players[0]}
                      compareCallback={this.compareCallback.bind(this)}
                      scoreColour={this.state.scoreColours[0]}
                      showStats={true}
                      stats={this.state.stats[0]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PlayerCard
                      id={2}
                      defaultPlayer={this.state.players[1]}
                      compareCallback={this.compareCallback.bind(this)}
                      scoreColour={this.state.scoreColours[1]}
                      showStats={true}
                      stats={this.state.stats[1]}
                    />
                  </Grid>
                </Grid>
              </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Compare);
