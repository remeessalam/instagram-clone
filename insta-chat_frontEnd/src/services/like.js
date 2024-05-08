import axios from './axioscall'

const clickLike = (postId) => {

    return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem('userToken'))
        axios.post('/post/clicklike', { postId }, { headers: { 'x-access-token': token } }).then(data => {
            resolve(data)
        }).catch(err => reject(err))
    })
}



export default clickLike