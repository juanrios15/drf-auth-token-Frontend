import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography, Link } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Header() {

  const classes = useStyles();
  const logged = localStorage.getItem('token') ? true : false

  function access() {
    if (!logged) {
      return (
        <React.Fragment>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/register">Register</Button>
        </React.Fragment>
      )

    } else {
      return (
        <React.Fragment>
          <Button color="inherit" href="/profile">Profile</Button>
          <Button color="inherit" href="/logout">Logout</Button>
        </React.Fragment>
      )
    }
  }
    


  return (
      <div className={classes.root}>
          <AppBar position="static" color="secondary">
              <Toolbar>
                  <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                  <Link href="/" color="textPrimary" underline="none">
                      Blog
                  </Link>
                  </Typography>
                  {access()}
              </Toolbar>
          </AppBar>
      </div>
  )
}
