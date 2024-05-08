// import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from '../../services/axioscall'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { userReducer } from "../../reduxgobalState/userSlice"
import { useDispatch } from 'react-redux';


function Login() {

    const navigate = useNavigate()

    const [error, setError] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('userToken'))
        if (token) {
            navigate('/')
        }
    }, [navigate])

    const onSubmit = async (formData) => {

        try {
            const { data } = await axios.post('/login', formData)
            if (data.status === !false) {
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
        catch (err) {
            // console.log(err, 'login error')
        }
    }
    const response = async (credentialResponse) => {
        var token = credentialResponse.credential;
        var decoded = jwt_decode(token);

        const { data } = await axios.post('/login', decoded)

        if (data.status === !false) {
            (localStorage.setItem('userToken', JSON.stringify(data?.token)))
            localStorage.setItem('userid', JSON.stringify(data?.userid))
            localStorage.setItem('user', JSON.stringify(data?.user))
            dispatch(userReducer())
            navigate('/')
        }
        else {
            setError(data.error)
            // console.log(data.error)
        }
    }

    return (
        <>
            <div className="flex min-h-full  items-center justify-center py-2 px-4 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-sm object-center space-y-8 border border-slate-200 p-10 mt-[10vh]">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://png.pngtree.com/png-clipart/20180626/ourmid/pngtree-instagram-icon-instagram-logo-png-image_3584852.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-serif font-light tracking-tight text-gray-900">
                            Instachat
                        </h2>

                    </div>
                    <form className="mt-8 space-y-6" action="" onSubmit={handleSubmit(onSubmit)} method="">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>

                                <input type="text" placeholder='email' className="relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
                                    {...register("email", {
                                        required: { value: true, message: "Email is required" },
                                        pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Enter a valid email" }
                                    })} />
                                {errors.email && <p className=' mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900'>{errors.email.message}</p>}
                            </div>
                            <div>

                                <input type="password" placeholder='password' className="relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-3"
                                    {...register("password", { required: { value: true, message: "Password required" }, minLength: { value: 8, message: "Password should be 8 characters long" } })} />
                                {errors.password && <p className=' mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900'>{errors.password.message}</p>}
                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#0ea5e9] py-2 px-4 text-sm font-medium text-white hover:bg-[#0ea5e9] "
                            >

                                Log in
                            </button>

                        </div>
                    </form>


                    <div className='flex mx-auto'>

                        <div className='w-5/12 h-7 flex flex-col justify-center'><hr className='bg-black-700' />
                        </div>
                        <h4 className='text-center font-semibold decoration-[#4a4b4b] px-2 w-2/12'> OR </h4>
                        <div className='w-5/12 h-7 flex flex-col justify-center'><hr className='bg-black-700' />
                        </div>
                    </div>

                    <span className='flex justify-center'>
                        <GoogleLogin
                            onSuccess={response}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                        />
                    </span>
                    {
                        error ? <p className='text-center text-red-600'>{error}</p>
                            : <p></p>
                    }
                </div>
            </div>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-sm object-center space-y-7 border border-slate-200 p-8 ">
                    <p className='text-center' >Don't have an account? <button className='text-sky-600 font-bold'><Link to={'/signup'}>Sign up</Link></button></p>
                </div>
            </div>
        </>
    )
}




export default Login


