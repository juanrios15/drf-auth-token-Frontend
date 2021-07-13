import React, {useState, useEffect} from 'react'
import axiosInstance from '../axios'
import { useParams } from 'react-router'

import { Grid, Typography } from '@material-ui/core'

export default function Singlepost() {

    const {slug} = useParams()
    const [data, setData] = useState({ post: []})

    useEffect(() => {
        axiosInstance.get(`posts/posts/${slug}`).then((res) => {
            setData({post: res.data})
            console.log(res.data)
        })
    }, [setData, slug])


    return (
        <div >
             <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {data.post.title}
            </Typography>
            <Grid container alignItems="center" justifyContent="center">

                    <img src={data.post.photo} alt="">
                    </img>

            </Grid>
            <br/>
            <hr/>
            <hr/>

            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {data.post.content}
            </Typography>
        </div>
    )
}
