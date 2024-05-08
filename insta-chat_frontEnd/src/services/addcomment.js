import axios from './axioscall'
import {  useNavigate } from "react-router-dom";

const AddComment = (postId, text) => {

    const navigate = useNavigate()

    let token = JSON.parse(localStorage.getItem('userToken'))

    !token && navigate('/login')

    return new Promise((resolve, rejecct) => {
        axios.post('/post/sendcomment', { postId, text }, { headers: { 'x-access-token': token } }).then(data => {
            resolve(data.data)
        }).catch(err => rejecct(err))
    })
}



export default AddComment