import axios from './axioscall';

const UpdateProfile = (form, user) => {

    let token = JSON.parse(localStorage.getItem('userToken'))

    return new Promise(async (resolve, reject) => {
        const profile = await axios.post('/profile', { user, form }, { headers: { 'x-access-token': token } })
        resolve(profile)
    })
}

export default UpdateProfile