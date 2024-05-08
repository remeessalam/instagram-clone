import axios from './axioscall'



const notification = () => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise(async (resolve, reject) => {
        const notification = await axios.get('/notification/getnotification', { headers: { 'x-access-token': token } })
        // console.log(notification, 'this is notification')
        resolve(notification)
    })
}

export default notification