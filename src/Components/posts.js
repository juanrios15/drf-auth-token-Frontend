import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Link } from '@material-ui/core';



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Posts = (props) => {
    const { posts } = props
    const classes = useStyles();
    if (posts == null) {
        return (
            <div>
                Data is loading...
            </div>
        )
    }
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {posts.map((post) => {
                        return (
                            <Grid item key={post.id} xs={12} md={4}>
                                <Card className={classes.root}>
                                    <Link color="textPrimary" href={'post/'+ post.slug} className={classes.link} underline="none">
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={post.photo}
                                                title="Post picture"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {post.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {post.summary}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}

                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Posts;