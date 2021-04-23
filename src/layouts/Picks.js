import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

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
    doneButton: {
        marginLeft: "auto",
        color: "green",
    },
    cancelButton: {
        marginLeft: "auto",
        color: '#fc045c',
    },
});

class Picks extends React.Component {
    constructor(props) {
        super(props);
        this.defaultPlayer = {
            id: 0,
            name: "Name",
            team: "Team",
            threat: "0.0",
            influence: "0.0",
            goals: 0,
            assists: 0,
            creativity: "0.0",
        };
        this.state = {
            subs: [[this.defaultPlayer, this.defaultPlayer]],
            transfers: [[this.defaultPlayer, this.defaultPlayer]],
            subComplete: false,
            transferComplete: false
        };
    }

    componentDidMount() {
        fetch("/api/picks")
            .then(response => response.json())
            .then(response => this.setState({
                subs: response["subs"],
                transfers: response["transfers"]
            }));
    }

    createPlayerCards() {
        let cards = {
            subs: [],
            transfers: [],
        };

        this.state.subs.forEach(
            (change, i) =>
                change.forEach(
                    (player, j) =>
                        cards["subs"].push(
                            <Grid item xs={12} md={6}>
                              <PlayerCard
                                key={"" + i + "." + j}
                                defaultPlayer={player}
                                scoreColour={j === 0 ? "#fc045c" : "#00ff87"}
                                showStats={false}
                              />
                            </Grid>
                        )));
        this.state.transfers.forEach(
            (change, i) =>
                change.forEach(
                    (player, j) =>
                        cards["transfers"].push(
                            <Grid item xs={12} md={6}>
                              <PlayerCard
                                key={"" + i + "." + j}
                                defaultPlayer={player}
                                scoreColour={j === 0 ? "#fc045c" : "#00ff87"}
                                showStats={false}
                              />
                            </Grid>
                        )));

        return cards;
    }

    render() {
        const { classes } = this.props;
        let cards = this.createPlayerCards();

        return (
            <div className={classes.root}>
              <AppBar position="static" className={classes.bar}>
                <Toolbar>
                  <Typography variant="h6" align="center" className={classes.title}>
                    Picks
                  </Typography>
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={11} md={11}>
                    <Typography variant="h4">
                      Substitutions
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {this.state.subComplete ?
                     <Tooltip title="Undo all">
                       <IconButton
                         className={classes.cancelButton}
                         onClick={() => this.setState({ subComplete: false })}
                       >
                         <CancelTwoToneIcon />
                       </IconButton>
                     </Tooltip>
                     :
                     <Tooltip title="Make all">
                       <IconButton
                         className={classes.doneButton}
                         onClick={() => this.setState({ subComplete: true })}
                       >
                         <CheckCircleTwoToneIcon />
                       </IconButton>
                     </Tooltip>}
                  </Grid>
                  {this.state.subComplete ?
                   <Grid item xs={12} md={12}>
                     <Typography variant="h5" align="center">
                       Done!
                     </Typography>
                   </Grid>
                   :
                   cards["subs"]}
                  <Grid item xs={11} md={11}>
                    <Typography variant="h4">
                      Transfers
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {this.state.transferComplete ?
                     <Tooltip title="Undo all">
                       <IconButton
                         className={classes.cancelButton}
                         onClick={() => this.setState({ transferComplete: false })}
                       >
                         <CancelTwoToneIcon />
                       </IconButton>
                     </Tooltip>
                     :
                     <Tooltip title="Make all">
                       <IconButton
                         className={classes.doneButton}
                         onClick={() => this.setState({ transferComplete: true })}
                       >
                         <CheckCircleTwoToneIcon />
                       </IconButton>
                     </Tooltip>}
                  </Grid>
                  {this.state.transferComplete ?
                   <Grid item xs={12} md={12}>
                     <Typography variant="h5" align="center">
                       Done!
                     </Typography>
                   </Grid>
                   :
                   cards["transfers"]}
                </Grid>
              </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Picks);
