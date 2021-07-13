import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';

// Material UI

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
}));

function Profile() {

    const [appState, setAppState] = useState({
        posts: null,
    })
    useEffect(() => {
        axiosInstance.get('postsurls/userposts/').then((res) => {
            const allPosts = res.data;
            setAppState({ posts: allPosts });
        });
    }, [setAppState])
    const classes = useStyles()
    console.log(appState.posts);
    if (!appState.posts || appState.posts.length === 0)
        return <React.Fragment>
            <Container maxWidth="md" component="main">
                <br />
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Id </TableCell>
                                    <TableCell align="left"> Category </TableCell>
                                    <TableCell align="left"> Title </TableCell>
                                    <TableCell align="left"> Action </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row"> </TableCell>
                                    <TableCell align="left"> </TableCell>
                                    <TableCell align="left">
                                        You don't have any posts
                                    </TableCell>
                                    <TableCell align="left">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={4} align="right">
                                        <Button href={'/admin/create'} variant="contained" color="primary">
                                            New Post
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Paper>
            </Container>
        </React.Fragment>
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <br />
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Id </TableCell>
                                    <TableCell align="left"> Category </TableCell>
                                    <TableCell align="left"> Title </TableCell>
                                    <TableCell align="left"> Action </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appState.posts.map((post) => {
                                    return (
                                        <TableRow key={post.id}>
                                            <TableCell component="th" scope="row"> {post.id} </TableCell>
                                            <TableCell align="left"> {post.category} </TableCell>
                                            <TableCell align="left">
                                                <Link color="textPrimary" href={'/post/' + post.slug} className={classes.link}>
                                                    {post.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link color="textPrimary" href={'/admin/update/' + post.id} className={classes.link}>
                                                    <EditIcon></EditIcon>
                                                </Link>
                                                <Link color="textPrimary" href={'/admin/delete/' + post.id} className={classes.link}>
                                                    <DeleteForeverIcon></DeleteForeverIcon>
                                                </Link>

                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                                <TableRow>
                                    <TableCell colSpan={4} align="right">
                                        <Button href={'/admin/create'} variant="contained" color="primary">
                                            New Post
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default Profile;