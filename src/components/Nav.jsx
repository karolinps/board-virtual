import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign:"center"
    },
    IconHome : {
        color:"#fff !important"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/"  className={classes.IconHome}>
                        <Tooltip title="Dashboard">
                            <HomeIcon />
                        </Tooltip>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Board
          </Typography>
                </Toolbar>
            </AppBar>
            <br />
        </div>
    );
}
