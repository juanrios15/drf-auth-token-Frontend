import React, {useEffect} from 'react'
import axiosInstance from '../axios'
import { useHistory } from 'react-router'

export default function Logout() {
    const history = useHistory();

    useEffect(() => {
        axiosInstance.post('users/logout/',)
        localStorage.removeItem('token')
        axiosInstance.defaults.headers['Authorization'] = null
        history.push('/')
        window.location.reload();
    })

    return <div>
        Logout
    </div>
}
