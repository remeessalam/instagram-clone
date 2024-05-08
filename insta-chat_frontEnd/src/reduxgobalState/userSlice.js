import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    },
    reducers: {
        userReducer: (state, action) => {
            let data = JSON.parse(localStorage.getItem('user'))
            state.user = {
                name: data?.name,
                image: data?.image,
                userId: data?._id
            }
        },
        userImage: (state, action) => {
            console.log(state.user, action.payload)
            state.user = { ...state.user, image: action.payload }
            console.log(state)
        }
    }

})


export const { userReducer, userImage } = userSlice.actions

export default userSlice.reducer