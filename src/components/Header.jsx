import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    paper: {
        paddingBottom: 50
    },
    list: {
        marginBottom: theme.spacing.unit * 2
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper
    },
    appBar: {
        top: "auto",
        bottom: 0
    },
    toolbar: {
        alignItems: "center",
        justifyContent: "space-between"
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
    }
});

function Header(props) {
    const { classes, setDialog } = props;

    const changeLang = () => {
        if (props.language === "NO") {
            props.setLanguage("EN");
        } else {
            props.setLanguage("NO");
        }
    };

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Fab
                        color="secondary"
                        aria-label="Add"
                        className={classes.fabButton}
                        onClick={() => setDialog(true)}
                    >
                        <AddIcon />
                    </Fab>
                    <div>
                        <Button onClick={() => changeLang()}>
                            <p className="white">{props.language}</p>
                        </Button>
                    </div>
                    <Tooltip disableFocusListener title="Work in progress">
                        <IconButton color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
