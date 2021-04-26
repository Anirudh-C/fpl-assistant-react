import React from 'react';
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
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        borderRadius: 20,
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(4),
    },
    closeButton: {
        marginLeft: "auto",
        color: '#fc045c',
    },
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
    media: {
        width: "80%",
        marginLeft: 'auto',
        paddingRight: theme.spacing(3),
    },
    scorePie: {
        fill: "none",
    },
    score: {
        height: 250,
        width: 250,
        preserveAspectRatio: "none",
        maxWidth: "100%",
    },
    scoreText: {
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
        fontWeight: 600,
        fontSize: "6rem",
        lineHeight: "1.167",
        letterSpacing: "-0.01562em",
        fill: "#37003c",
    },
});

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.defaultPlayer,
            options: [],
            teams: [],
            inputQuery: "",
            chosen: false,
            playerUrl:
            this.props.defaultPlayer.id === 0 ?
                ""
                :
                "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                this.props.defaultPlayer.code + ".png",
            scoreColour: this.props.scoreColour,
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
                          player: this.props.defaultPlayer,
                          options: [],
                          inputQuery: "",
                          chosen: false,
                          playerUrl: ""
                      });
        this.props.compareCallback(this.props.id, newValue);
    }

    handlePlayerSearch(event, newValue, reason) {
        reason === "input" && this.setState({ inputQuery: newValue });
    }

    componentDidMount() {
        fetch("/api/teams")
            .then(response => response.json())
            .then(response => this.setState({ teams: response["teams"] }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.inputQuery !== this.state.inputQuery && this.state.inputQuery != "") {
            fetch("/api/search_players?name=" + this.state.inputQuery.toLowerCase())
                .then(response => response.json())
                .then(response => this.setState({ options: response["players"] }));
        }
        if (prevProps.scoreColour !== this.props.scoreColour) {
            this.setState({
                scoreColour : this.props.scoreColour
            });
        }
        if (prevProps.defaultPlayer !== this.props.defaultPlayer) {
            this.setState({
                player: this.props.defaultPlayer,
                chosen: true,
                playerUrl:
                this.props.defaultPlayer.id === 0 ?
                    ""
                    :
                    "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                    this.props.defaultPlayer.code + ".png"
            });
        }
    }

    renderOption(option) {
        const { classes } = this.props;
        const preName = option.full_name.substring(
            0, option.match);
        const matchName = option.full_name.substring(
            option.match, option.match + this.state.inputQuery.length);
        const postName = option.full_name.substring(
            option.match + this.state.inputQuery.length, option.full_name.length);

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
            player: this.props.defaultPlayer,
            options: [],
            inputQuery: "",
            chosen: false,
            playerUrl: "",
            scoreColour: "#37003c",
        });
        this.props.compareCallback(this.props.id, null);
    }

    render() {
        const size = 250;
        const strokeWidth = 20;
        const center = size / 2;
        const radius = size / 2 - strokeWidth / 2;
        const circ = 2 * Math.PI * radius;
        const { classes } = this.props;

        return (
            <Card className={classes.card} variant="outlined">
              <CardContent className={classes.content}>
                <Typography variant="h6" component="h2">
                  {this.state.player.full_name}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary" gutterBottom>
                  {this.state.teams[this.state.player.team_id - 1]}
                </Typography>
                {!this.state.chosen && this.props.showStats?
                 <Autocomplete
                   options={this.state.options}
                   onChange={this.handlePlayerSelect.bind(this)}
                   onInputChange={this.handlePlayerSearch.bind(this)}
                   getOptionLabel={(option) => option.full_name}
                   getOptionSelected={(option, value) => option.id === value.id}
                   renderOption={this.renderOption.bind(this)}
                   className={classes.form}
                   renderInput={(params) => <TextField {...params} variant="outlined" label="Player name:"/>}
                   noOptionsText="No players"
                 />
                 :
                 <Grid container spacing={3} alignItems="center" direction="column">
                   <Grid item xs={12} md={6}>
                     <CardMedia
                       className={classes.media}
                       component="img"
                       src={this.state.playerUrl}
                       title={this.state.player.name}
                     />
                   </Grid>
                   <Grid item xs={12} md={6}>
                     <svg className={classes.score}>
                       <circle
                         className={classes.scorePie}
                         stroke={this.state.scoreColour}
                         cx={center}
                         cy={center}
                         r={radius}
                         strokeWidth={strokeWidth}
                         strokeDasharray={circ}
                         strokeDashoffset={(100 - this.state.player.score) * circ / 100}
                       />
                       <text
                         className={classes.scoreText}
                         x="50%"
                         y="50%"
                         dominantBaseline="middle"
                         textAnchor="middle"
                       >
                         {Math.floor(this.state.player.score)}
                        </text>
                     </svg>
                   </Grid>
                   {this.props.showStats &&
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" component="p" color="textSecondary" gutterBottom>
                        Stats coming soon!
                      </Typography>
                    </Grid>}
                 </Grid>}
              </CardContent>
              {this.props.showStats &&
               <CardActions>
                 <Tooltip title="Close">
                   <span className={classes.closeButton}>
                     <IconButton
                       disabled={!this.state.chosen}
                       onClick={this.unChoosePlayer.bind(this)}
                     >
                       <CancelTwoToneIcon />
                     </IconButton>
                   </span>
                 </Tooltip>
               </CardActions>}
            </Card>
        );
    }
}

export default withStyles(styles)(PlayerCard);
