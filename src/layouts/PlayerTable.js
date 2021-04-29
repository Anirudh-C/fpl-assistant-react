import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { Link } from "react-router-dom";

import DashCard from "../components/DashCard";

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";

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
    link: {
        color: "#37003c",
        textDecoration: "none"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    toolbarRoot: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: {
        color: "#00ff87",
        backgroundColor: "#37003c",
    },
    toolbarTitle: {
        flex: "1 1 100%",
    },
});

class PlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            players: [],
            selected: [],
        };
    }

    componentDidMount() {
        fetch("/api/search_players")
            .then(response => response.json())
            .then(response => this.setState({ players: response["players"] }));
    }

    handleSelect(event, playerSelect) {
        let selected = [];
        const index = this.state.selected.findIndex(player => player.id === playerSelect.id);
        if (index === -1) {
            selected = selected.concat(this.state.selected, playerSelect);
        }
        else if (index === 0) {
            selected = selected.concat(this.state.selected.slice(1));
        }
        else if (index === this.state.selected.length - 1) {
            selected = selected.concat(this.state.selected.slice(0, -1));
        }
        else {
            selected = selected.concat(
                this.state.selected(0, index),
                this.state.selected(index + 1));
        }
        this.setState({ selected: selected });
    }

    isSelected(player_id) {
        return this.state.selected.some(player => player.id === player_id);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
              <AppBar position="static" className={classes.bar}>
                <Toolbar>
                  <Typography variant="h6" align="center" className={classes.title}>
                    Players
                  </Typography>
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg" className={classes.container}>
                <Paper>
                  <Toolbar
                    className={
                        this.state.selected.length > 0 ?
                            classes.highlight
                            :
                            classes.toolbarRoot}
                  >
                    {this.state.selected.length > 0 ?
                     <Typography variant="subtitle1" className={classes.toolbarTitle}>
                       {this.state.selected.length} players selected
                     </Typography>
                     :
                     <Typography variant="h6" className={classes.toolbarTitle}>
                       Players
                     </Typography>
                    }
                    {this.state.selected.length === 2 &&
                     <Button
                       color="secondary"
                       onClick={() => this.props.history.push({
                           pathname: "/compare",
                           state: this.state.selected
                       })}
                     >
                       Compare
                     </Button>
                    }
                  </Toolbar>

                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                          </TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Score</TableCell>
                          <TableCell align="right">Goals</TableCell>
                          <TableCell align="right">Assists</TableCell>
                          <TableCell align="right">Clean Sheets</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Avg. Points</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.players
                         .slice(this.state.page * this.state.rowsPerPage,
                                (this.state.page + 1) * this.state.rowsPerPage)
                         .map((player) => {
                             const isItemSelected = this.isSelected(player.id);
                             return (
                                 <TableRow
                                   hover
                                   key={player.id}
                                   role="checkbox"
                                   tabIndex={-1}
                                   selected={isItemSelected}
                                   onClick={(event) => this.handleSelect(event, player)}
                                 >
                                   <TableCell padding="checkbox">
                                     <Checkbox
                                       checked={isItemSelected}
                                     />
                                   </TableCell>
                                   <TableCell component="th" scope="row" padding="none">
                                     {player.full_name}
                                   </TableCell>
                                   <TableCell align="right">{Math.floor(player.score)}</TableCell>
                                   <TableCell align="right">{player.goals_scored}</TableCell>
                                   <TableCell align="right">{player.assists}</TableCell>
                                   <TableCell align="right">{player.clean_sheets}</TableCell>
                                   <TableCell align="right">{player.now_cost}</TableCell>
                                   <TableCell align="right">{player.points_per_game}</TableCell>
                                 </TableRow>
                             );
                         })}
                    </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.players.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={
                        (event, newPage) => this.setState({ page: newPage })}
                    onChangeRowsPerPage={
                        (event) => this.setState({ rowsPerPage: parseInt(event.target.value, 10) })}
                  />
                </Paper>
              </Container>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(PlayerTable));
