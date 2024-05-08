// import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import axios from '../../services/axioscall'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { userReducer } from "../../reduxgobalState/userSlice"
import { useDispatch } from 'react-redux';

function Signup() {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [error, setError] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token) {
            navigate('/')
        }
    })

    const onSubmit = async (formData) => {
        const { data } = await axios.post('/signup', formData)
        if (data.status === true) {

            localStorage.setItem('userToken', JSON.stringify(data.token))
            localStorage.setItem('userid', JSON.stringify(data?.userid))
            localStorage.setItem('user', JSON.stringify(data?.user))
            dispatch(userReducer())
            navigate('/')
        }
        else {
            setError(data.error)
        }
    }

    const response = async (credentialResponse) => {

        //    const googlelogin  = jwt_decode(credentialResponse)

        var token = credentialResponse.credential;
        var decoded = jwt_decode(token);

        const { data } = await axios.post('/login', decoded)

        if (data.status === !false) {
            (localStorage.setItem('userToken', JSON.stringify(data.token)))
            navigate('/')
        }
        else {
            setError(data.error)
            console.log(data.error)
        }
    }

    return (
        <>

            <div className="flex min-h-full  items-center justify-center py-2 px-4 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-sm object-center space-y-8 border border-slate-200 p-10 mt-[10vh]">
                    <div>

                        <h2 className="text-center text-5xl font-serif font-light tracking-tight text-gray-900">
                            Instachat
                        </h2>
                        <p className='text-center text-gray-400 font-bold mt-7 pb-4'>Sign up to see photos and videos from your friends.</p>

                        <button type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white  ">
                            <span className='flex justify-center'>
                                <GoogleLogin
                                    onSuccess={response}
                                    onError={() => {
                                        console.log('Login Failed')
                                    }}
                                />
                            </span>
                        </button>

                    </div>
                    <div className='flex mx-auto'>

                        <div className='w-5/12 h-7 flex flex-col justify-center'><hr className='bg-black-700' />
                        </div>
                        <h4 className='text-center font-semibold decoration-[#4a4b4b] px-2 w-2/12'> OR </h4>
                        <div className='w-5/12 h-7 flex flex-col justify-center'><hr className='bg-black-700' />
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" action="" onSubmit={handleSubmit(onSubmit)} method="">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <input type="text" placeholder='Full Name' className="relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
                                    {...register("fullName", {
                                        required: { value: true, message: "Enter Full Name" },
                                        minLength: { value: 4, message: 'Enter Name' }
                                    })} />
                                {errors.fullName && <p className=' mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900'>{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <input type="text" placeholder='Email' className="relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-3"
                                    {...register("email", {
                                        required: { value: true, message: "Email is required" },
                                        pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Enter a valid email" }
                                    })} />
                                {errors.email && <p className=' mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900'>{errors.email.message}</p>}
                            </div>
                            <div>
                                <input type="password" placeholder='Password'  className="relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-3"
                                    {...register("password", { required: { value: true, message: "Password required" }, minLength: { value: 8, message: "Password should be 8 characters long" } })} />
                                {errors.password && <p className=' mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900'>{errors.password.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#0ea5e9] py-2 px-4 text-sm font-medium text-white hover:bg-[#0ea5e9] "
                            >

                                Sign up
                            </button>
                            {
                                error ? <p className='text-center text-red-600 pt-3'>{error}</p>
                                    : <p></p>
                            }

                        </div>
                    </form>



                </div>
            </div>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-sm object-center space-y-7 border border-slate-200 p-8 ">
                    <p className='text-center' >Have an account? <button className='text-sky-600 font-bold' ><Link to={'/login'}>Log in</Link></button></p>
                </div>
            </div>
        </>
    )
}




export default Signup