import axios from './axioscall'

const follow = (frndid) => {

    return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem('userToken'))
        axios.post('/follow', { frndid }, { headers: { 'x-access-token': token } })
            .then((data => {
                resolve(data)
            }))
            .catch((err) => reject(err))
    })
}

export default follow