import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router';

// Material UI
import { Avatar, Checkbox, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,

    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

export default function SignUp() {
    const history = useHistory();
    const initialFormData = Object.freeze( {
        email: '',
        username: '',
        password: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`users/register/`, {
                email: formData.email,
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                history.push('/login');
                console.log(res)
                console.log(res.data)
            })
    }
    const classes = useStyles();

    return ( 
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        variant="outlined" 
                        required 
                        fullWidth 
                        id="email" 
                        label="Email Address" 
                        name="email" 
                        autoComplete="email" 
                        onChange={handleChange} 
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        variant="outlined" 
                        required 
                        fullWidth 
                        id="username" 
                        label="Username" 
                        name="username" 
                        autoComplete="username" 
                        onChange={handleChange} 
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        variant="outlined" 
                        required 
                        fullWidth 
                        id="password" 
                        type="password" 
                        label="Password" 
                        name="password" 
                        autoComplete="current-password" 
                        onChange={handleChange} 
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control = {<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive promotions via email"
                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}>
                        Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account?
                        </Link>
                    </Grid>

                </Grid>

            </form>
        </div>

    </Container>

    )
}
