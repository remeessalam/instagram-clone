import axios from './axioscall'

const Unfollow = (frndid) => {

    return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem('userToken'))
        axios.post('/unfollow', { frndid }, { headers: { 'x-access-token': token } })
            .then((data => {
                resolve(data)
            }))
            .catch((err) => reject(err))
    })
}

export default Unfollow