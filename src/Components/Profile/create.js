import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Container, CssBaseline, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Create() {

    const history = useHistory()

    const initialFormData = Object.freeze({

        title: '',
        summary: '',
        content: '',
    });

    const [formData, updateFormData] = useState(initialFormData)

    const [categoryState, setcategoryState] = useState({
        categories: null,
    })
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        axiosInstance.get('posts/categories/').then((res) => {
            const cats = res.data;
            setcategoryState({ categories: cats });
        });
    }, [setcategoryState])

    const [Cat, setCat] = useState('');
    const [postimage, setPostImage] = useState(null);

    
    const handleChange = (e) => {
        if ([e.target.name] == 'category') {
            setCat(e.target.value);
        }
        else if ([e.target.name] == 'public') {
            
            setChecked(e.target.checked);
        }
        else if ([e.target.name] == 'photo') {
            
            setPostImage({
				photo: e.target.files,
			});
        }
        
        else {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim(),
            })
        }
        
    }
    
    const classes = useStyles()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let Data = new FormData();
		Data.append('user', localStorage.getItem("user_id"));
		Data.append('category', Cat);
		Data.append('title', formData.title);
		Data.append('summary', formData.summary);
		Data.append('content', formData.content);
		Data.append('public', checked);
		Data.append('photo', postimage.photo[0]);
        axiosInstance
            .post(`posts/posts/`, Data)
            .then((res) => {
                history.push('/profile/')
            })
    }



    if (categoryState.length === 0 || categoryState.categories === null)
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        Create New Post
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl} >
                                    <InputLabel id="category">Category</InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        name="category"
                                        value={""}
                                        onChange={handleChange}
                                    >
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="title" label="Post Title" name="title" autoComplete="title" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="summary" label="Post summary" name="summary" autoComplete="summary" onChange={handleChange} multiline rows={2} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="content" label="Post Content" name="content" autoComplete="content" onChange={handleChange} multiline rows={4} />
                            </Grid>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        name="public"
                                        id="public"
                                        color="primary"
                                    />
                                }
                                label="Public?"
                            />
                        </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" component="label">
                                    Upload File
                                    <input type="file" hidden id="photo" name="photo" onChange={handleChange} />
                                </Button>
                            </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                            Create Post
                        </Button>
                    </form>
                </div>
            </Container>
        )

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Create New Post
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    id="category"
                                    name="category"
                                    value={Cat}
                                    onChange={handleChange}
                                >
                                    {categoryState.categories.map((category) => {
                                        return (
                                            <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="title" label="Post Title" name="title" autoComplete="title" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="summary" label="Post summary" name="summary" autoComplete="summary" onChange={handleChange} multiline rows={2} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="content" label="Post Content" name="content" autoComplete="content" onChange={handleChange} multiline rows={4} />
                        </Grid>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    name="public"
                                    id="public"
                                    color="primary"
                                />
                            }
                            label="Public?"
                        />
                    </Grid>
                    <Grid item xs={12}>
                                <Button variant="contained" component="label">
                                    Upload File
                                    <input type="file" hidden id="photo" name="photo" onChange={handleChange} />
                                </Button>
                            </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                        Create Post
                    </Button>
                </form>
            </div>
        </Container>
    )
}


