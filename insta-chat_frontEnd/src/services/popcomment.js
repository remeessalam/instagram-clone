import axios from './axioscall'

const Popcomment = (postid, commentid) => {

    return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem('userToken'))
        axios.post('/post/popcomment', { postid, commentid }, { headers: { 'x-access-token': token } }).then(data => {
            resolve(data)
        }).catch(err => reject(err))
    })
}


export default Popcomment