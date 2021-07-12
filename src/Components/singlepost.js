import React, {useState, useEffect} from 'react'
import axiosInstance from '../axios'
import { useParams } from 'react-router'

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
        <div>
            Este es el detalle del POST {data.post.title}
        </div>
    )
}
