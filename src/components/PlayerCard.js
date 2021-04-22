import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PersonIcon from '@material-ui/icons/Person';
import CancelIcon from '@material-ui/icons/Cancel';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    form: {
        margin: theme.spacing(1),
        width: "100%",
    },
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
    media: {
        width: "80%",
        marginLeft: 'auto',
        paddingRight: theme.spacing(3),
    }
});

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.defaultPlayer = {
            id: 0,
            name: this.props.name,
            team: this.props.team,
            threat: "0.0",
            influence: "0.0",
            goals: 0,
            assists: 0,
            creativity: "0.0",
        };
        this.state = {
            player: this.defaultPlayer,
            options: [],
            inputQuery: "",
            chosen: false,
            playerUrl: "",
        };
    }

    handlePlayerSelect(event, newValue) {
        this.setState(newValue ?
                      {
                          player: newValue,
                          chosen: true,
                          playerUrl:
                          "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                              newValue.code + ".png"
                      }
                      :
                      {
                          player: this.defaultPlayer,
                          options: [],
                          inputQuery: "",
                          chosen: false,
                          playerUrl: ""
                      });
        if (this.state.chosen) {
            this.props.compareCallback(this.props.id, this.state.player);
        }
    }

    handlePlayerSearch(event, newValue, reason) {
        reason === "input" && this.setState({ inputQuery: newValue });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.inputQuery !== this.state.inputQuery && this.state.inputQuery != "") {
            fetch("/api/search_players?query=" + this.state.inputQuery.toLowerCase())
                .then(response => response.json())
                .then(response => this.setState({ options: response["players"] }));
        }
    }

    renderOption(option) {
        const { classes } = this.props;
        const preName = option.name.substring(
            0, option.match);
        const matchName = option.name.substring(
            option.match, option.match + this.state.inputQuery.length);
        const postName = option.name.substring(
            option.match + this.state.inputQuery.length, option.name.length);

        return (
            <Grid container alignItems="center">
              <Grid item>
                <PersonIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary" display="inline">
                  {preName}
                </Typography>
                <Typography variant="body2" color="textPrimary" display="inline">
                  {matchName}
                </Typography>
                <Typography variant="body2" color="textSecondary" display="inline">
                  {postName}
                </Typography>
              </Grid>
            </Grid>
        );
    }

    unChoosePlayer() {
        this.setState({
            player: this.defaultPlayer,
            options: [],
            inputQuery: "",
            chosen: false,
            playerUrl: ""
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
              <CardContent className={classes.content}>
                <Typography variant="h6" component="h2">
                  {this.state.player.name}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary" gutterBottom>
                  {this.state.player.team}
                </Typography>
                {!this.state.chosen ?
                 <Autocomplete
                   options={this.state.options}
                   onChange={this.handlePlayerSelect.bind(this)}
                   onInputChange={this.handlePlayerSearch.bind(this)}
                   getOptionLabel={(option) => option.name}
                   getOptionSelected={(option, value) => option.id === value.id}
                   renderOption={this.renderOption.bind(this)}
                   renderInput={(params) => <TextField {...params} label="Player name:"/>}
                   noOptionsText="No players"
                 />
                 :
                 <Grid container spacing={3}>
                   <Grid item xs={12} md={6}>
                     <CardMedia
                       className={classes.media}
                       component="img"
                       src={this.state.playerUrl}
                       title={this.state.player.name}
                     />
                   </Grid>
                   <Grid item xs={12} md={6}>
                     <Typography variant="body2" component="p" color="textSecondary" gutterBottom>
                       Stats coming soon!
                     </Typography>
                   </Grid>
                 </Grid>}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  disabled={!this.state.chosen}
                  onClick={this.unChoosePlayer.bind(this)}
                >
                  Close Player
                </Button>
              </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(PlayerCard);
