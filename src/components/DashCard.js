import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    link: {
        color: "#37003c",
        textDecoration: "none",
    },
    moreButton: {
        marginLeft: "auto",
    },
});

class DashCard extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h2">
                  {this.props.title}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary" gutterBottom>
                  {this.props.subtitle}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" className={classes.moreButton}>
                  {this.props.loginReqd && !this.props.login ?
                   <Link to="/login" className={classes.link}>
                     {this.props.linkText}
                   </Link>
                   :
                   <Link to={this.props.link} className={classes.link}>
                     {this.props.linkText}
                   </Link>
                  }
                </Button>
              </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(DashCard);
