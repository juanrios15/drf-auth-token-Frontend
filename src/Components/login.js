import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import axiosInstance from '../axios'

// Material UI

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Login() {

    const history = useHistory();
    const initialFormData = Object.freeze({
        username_email: '',
        password: ''
    })

    const [formData, setformData] = useState(initialFormData)

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("formdata", formData);

        axiosInstance
            .post(`users/login/`, {
                username_email: formData.username_email,
                password: formData.password,
            })
            .then((res) => {
                console.log("res", res);
                localStorage.setItem('token', res.data.token)
                axiosInstance.defaults.headers['Authorization'] =
                    'Token ' + localStorage.getItem('token')
                history.push('/')
                window.location.reload();
            }).catch(error => {
                throw error;
            })

    }
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username_email"
                        label="username_email"
                        name="username_email"
                        autoComplete="username_email"
                        autoFocus
                        onChange={handleChange} 
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange} 
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </Container>
    )
}
