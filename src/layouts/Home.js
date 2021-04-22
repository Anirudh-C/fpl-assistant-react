import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";

import DashCard from "../components/DashCard";

import { withStyles } from '@material-ui/core/styles';

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
});

class Home extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
              <AppBar position="static" className={classes.bar}>
                <Toolbar>
                  <Typography variant="h6" align="center" className={classes.title}>
                    Fantasy Premier League Assistant
                  </Typography>
                  {
                      this.props.login ?
                          <Button onClick={this.props.logoutCallback} color="inherit">
                            <Link to="/" className={classes.link}>
                              Logout
                            </Link>
                          </Button>
                      :
                      <Button color="inherit">
                        <Link to="/login" className={classes.link}>
                          Login
                        </Link>
                      </Button>
                  }
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DashCard
                      title="Pick your players!"
                      subtitle="Coming Soon"
                      linkText="More"
                      link="/"/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DashCard
                      title="Compare players"
                      subtitle="Coming Soon"
                      linkText="More"
                      link="/compare"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DashCard
                      title="The Best Team"
                      subtitle="Coming Soon"
                      linkText="More"
                      link="/"
                    />
                  </Grid>
                </Grid>
              </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
