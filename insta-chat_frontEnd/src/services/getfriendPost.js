import axios from './axioscall'

const GetfriendPost = (id) => {

    let token = JSON.parse(localStorage.getItem('userToken'))

    return new Promise((resolve, reject) => {
        axios.post('/post/getfriendpost', { id }, { headers: { 'x-access-token': token } })
            .then((data) => {
                console.log(data, 'get friendpost')
                resolve(data)
            })
    })
}


export default GetfriendPost