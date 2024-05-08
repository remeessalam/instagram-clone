import axios from './axioscall'

const addmessage = (chat) => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise(async (resolve, reject) => {
        const message = await axios.post('/chat/addmessage', { chat }, { headers: { 'x-access-token': token } })
        resolve(message)
    })
}

export default addmessage