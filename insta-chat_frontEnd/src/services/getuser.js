import axios from './axioscall'

const Getuser = () => {

    let token = JSON.parse(localStorage.getItem('userToken'))

    return new Promise((resolve, reject) => {
        axios.post('/getuser', {}, { headers: { 'x-access-token': token } })
            .then((data) => {
                resolve(data)
            })
    })

}


export default Getuser