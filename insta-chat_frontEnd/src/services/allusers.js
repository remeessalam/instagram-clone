import axios from './axioscall'

const allusers = () => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise(async (resolve, reject) => {
        const users = await axios.get('/users', { headers: { 'x-access-token': token } })
        resolve(users)
    })
}

export default allusers