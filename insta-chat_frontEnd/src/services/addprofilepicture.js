import axios from './axioscall'

const profilepicture = (image) => {
    let token = JSON.parse(localStorage.getItem('userToken'))
    return new Promise((resolve, reject) => {
        axios.post('/setprofilepicture', { image }, { headers: { 'x-access-token': token } })
            .then((data) => {
                resolve(data)
            })
    })
}


export default profilepicture