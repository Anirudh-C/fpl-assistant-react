import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://raw.githubusercontent.com/Anirudh-C/fpl-assistant-react/master/assets/theme-pl.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        color: "#00ff87",
        backgroundColor: "#37003c",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (!this.state.loggedIn) {
            event.preventDefault();
            var form = new FormData();
            form.append("login", this.state.email);
            form.append("password", this.state.password);
            const request = {
                method: "POST",
                credentials: "include",
                body: form
            };
            fetch("/api/login", request)
                .then(response => {
                    if (response.ok) {
                        this.setState({ loggedIn: true });
                        this.props.history.push("/");
                        this.props.loginCallback(response);
                    }
                    else {
                        this.props.history.push("/");
                        this.props.loginCallback(response);
                    }
                });
        }
        else {
            this.props.history.push("/");
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid item xs={false} sm={4} md={7} className={classes.image} />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign In to FPL
                  </Typography>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={this.handleSubmit}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onInput={
                          event =>
                              this.setState({email: event.target.value})}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      onInput={
                          event =>
                              this.setState({password: event.target.value})}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link
                          href="https://users.premierleague.com/accounts/password-reset"
                          variant="body2"
                        >
                          Forgot Password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="https://users.premierleague.com/a/profile/register"
                          variant="body2"
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                  </div>
              </Grid>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(Login));
