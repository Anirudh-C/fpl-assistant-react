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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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
            transfers: [[ ]],
            transferComplete: false,
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true },
                      () => {
                          fetch("/api/pick_players", {
                              credentials: 'include'
                          })
                              .then(response => {
                                  if (response.ok) {
                                      return response.json();
                                  }
                                  else {
                                      this.setState({
                                          transferComplete: true,
                                      });

                                      return response.json();
                                  }
                              })
                              .then(response => {
                                  if (response["transfers"].length) {
                                      this.setState({
                                          transfers: response["transfers"],
                                          loading: false});
                                  }
                                  else {
                                      this.setState({
                                          transferComplete: true,
                                          loading: false
                                      });
                                  }
                              });
                      });
    }

    createPlayerCards() {
        let cards = {
            transfers: [],
        };

        this.state.transfers.forEach(
            (change, i) =>
                change.forEach(
                    (player, j) =>
                        cards["transfers"].push(
                            <Grid item xs={12} md={6} key={i + "" + j}>
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

    handleTransfers() {
        if (this.state.transfers[0].length) {
            this.setState({ loading: true},
                          () =>
                          {
                              const request = {
                                  method: "POST",
                                  credentials: "include",
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                      "inplayers": this.state.transfers.map(x => x[0].id),
                                      "outplayers": this.state.transfers.map(x => x[1].id)
                                  })
                              };
                              fetch("/api/transfers", request)
                                  .then(response => {
                                  if (response.ok) {
                                      this.setState({
                                          loading: false,
                                          transferComplete: true
                                      });
                                  }
                                      else {
                                          this.setState({
                                              loading: false,
                                          });
                                      }
                                  });
                          });
        }
        else {
            this.setState({
                transferComplete: true
            });
        }
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
                <Grid container>
                  <Grid item xs={11} md={11}>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {!this.state.transferComplete &&
                     <Tooltip title="Make all">
                       <IconButton
                         className={classes.doneButton}
                         onClick={this.handleTransfers.bind(this)}
                       >
                         <CheckCircleTwoToneIcon />
                       </IconButton>
                     </Tooltip>}
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  {this.state.transferComplete ?
                   <Grid item xs={12} md={12}>
                     <Typography variant="h5" align="center" color="textSecondary">
                       You have the best team!!
                     </Typography>
                   </Grid>
                   :
                   cards["transfers"]}
                </Grid>
              </Container>
              <Backdrop className={classes.backdrop} open={this.state.loading}>
                <CircularProgress color="inherit"/>
              </Backdrop>
            </div>
        );
    }
}

export default withStyles(styles)(Picks);
