import axios from './axioscall'

const Getfriend = (id) => {

    let token = JSON.parse(localStorage.getItem('userToken'))

    return new Promise((resolve, reject) => {
        axios.post('/getfriend', { id }, { headers: { 'x-access-token': token } })
            .then((data) => {
                resolve(data)
            })
    })

}


export default Getfriend