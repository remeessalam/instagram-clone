import axios from './axioscall'

const finduser = (name) => {

    let token = JSON.parse(localStorage.getItem('userToken'))

    return new Promise((resolve, reject) => {
        console.log(token, 'get user token')
        axios.post('/finduser', { name }, { headers: { 'x-access-token': token } })
            .then((data) => {
                resolve(data)
                // console.log(data, 'getuser')
            })
    })

}

export default finduser