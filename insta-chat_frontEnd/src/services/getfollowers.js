import axios from './axioscall'


const getfollowing = () => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise(async (resolve, reject) => {
        const users = await axios.get('/getfollowing', { headers: { 'x-access-token': token } })
        resolve(users)
    })
}

export default getfollowing