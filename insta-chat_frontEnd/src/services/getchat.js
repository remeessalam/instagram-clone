import axios from './axioscall'

const getchat = (id) => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise(async (resolve, reject) => {
        const chat = await axios.post('/chat/getchat', { id }, { headers: { 'x-access-token': token } })
        resolve(chat)
    })
}

export default getchat