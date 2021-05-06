import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { Link } from "react-router-dom";

import DashCard from "../components/DashCard";
import Fixture from "../components/Fixture";

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";

import Cookies from "js-cookie";

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
    avatar: {
        backgroundColor: "#fc045c"
    },
    card: {
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            has_cookie: false,
            user_name: "",
            userDialog: false,
            fixtures: [],
        };
    }

    handleLogin() {
        const has_key = typeof Cookies.get("key") !== "undefined";
        const has_id = typeof Cookies.get("user_id") !== "undefined";
        if (has_key && has_id) {
            this.setState({ has_cookie: true });
            fetch("/api/username?id=" + Cookies.get("user_id"))
                .then(response => response.json())
                .then(response => this.setState({ username: response["name"] }));
            this.props.loginCallback();
        }
        else {
            this.props.history.push("/login");
        }
    }

    handleLogout() {
        this.setState({ has_cookie: false });
        this.props.logoutCallback();
    }

    handleUserDialog() {
        if (this.state.userDialog) {
            this.setState({ userDialog: false });
        }
        else {
            this.setState({ userDialog: true });
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            if (this.props.location.state === "set_cookie") {
                this.setState({ has_cookie: true });
                fetch("/api/username?id=" + Cookies.get("user_id"))
                    .then(response => response.json())
                    .then(response => this.setState({ username: response["name"] }));
                this.props.loginCallback();
            }
        }
        fetch("/api/get_fixtures")
            .then(response => response.json())
            .then(response => this.setState({ fixtures: response["fixtures"] }));
    }

    generateFixtures() {
        let fixtures = [];

        this.state.fixtures.forEach(
            (fixture, i) =>
                fixtures.push(
                    <Grid key={i} item xs={12} md={12}>
                      <Fixture
                        home={fixture.Home}
                        away={fixture.Away}
                        home_id={fixture.home_code}
                        away_id={fixture.away_code}
                      />
                    </Grid>));

        return fixtures;
    }

    render() {
        const { classes } = this.props;
        const fixtures = this.generateFixtures();

        return (
            <div className={classes.root}>
              <AppBar position="static" className={classes.bar}>
                <Toolbar>
                  <Typography variant="h6" align="center" className={classes.title}>
                    Fantasy Premier League Assistant
                  </Typography>
                  {
                      (this.state.has_cookie && this.state.username) &&
                      <Button onClick={this.handleUserDialog.bind(this)} color="primary">
                        <Avatar variant="square" className={classes.avatar}>
                          <AccountCircleTwoToneIcon color="primary"/>
                        </Avatar>
                        <Dialog open={this.state.userDialog}>
                          <DialogTitle>{"You are logged in as: " + this.state.username}</DialogTitle>
                        </Dialog>
                      </Button>}
                  {
                      this.props.login ?
                          <Button onClick={this.handleLogout.bind(this)} color="inherit">
                            <Link to="/" className={classes.link}>
                              Logout
                            </Link>
                          </Button>
                      :
                      <Button onClick={this.handleLogin.bind(this)} color="primary">
                        Login
                      </Button>
                  }
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DashCard
                      title="Manage your team"
                      subtitle="Login and find out which players to pick for next Gameweek"
                      linkText="More"
                      link="/picks"
                      loginReqd={true}
                      login={this.props.login}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DashCard
                      title="Compare players"
                      subtitle="Search and compare statistics of any two players"
                      linkText="More"
                      link="/compare"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DashCard
                      title="The Best Players"
                      subtitle="Navigate the list of all players"
                      linkText="More"
                      link="/players"
                    />
                  </Grid>
                  <Grid item xs={0} md={3}></Grid>
                  <Grid item xs={12} md={6}>
                    <Card className={classes.card} variant="outlined">
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          Fixtures
                        </Typography>
                        <Grid container spacing={2}>
                          {fixtures}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={0} md={3}></Grid>
                </Grid>
              </Container>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Home));
