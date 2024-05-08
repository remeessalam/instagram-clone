import axios from './axioscall'

const allpost = () => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise(async (resolve, reject) => {
        const post = await axios.get('/post/allpost', { headers: { 'x-access-token': token } })
        resolve(post)
    })
}

export default allpost
