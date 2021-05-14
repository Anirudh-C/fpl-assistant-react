import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        border: "none"
    },
});

class Fixture extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={5} align="right">
                    <img
                      src={
                          "https://resources.premierleague.com/premierleague/badges/50/t"
                          + this.props.home_id + ".png"}
                    />
                    <Typography>
                      {this.props.home}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} align="center">
                    <Typography variant="button">
                      vs
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <img
                      src={
                          "https://resources.premierleague.com/premierleague/badges/50/t"
                          + this.props.away_id + ".png"}
                    />
                    <Typography>
                      {this.props.away}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Fixture);

