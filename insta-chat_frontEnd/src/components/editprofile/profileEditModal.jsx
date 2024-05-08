import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import UpdateProfile from '../../services/updateProfile';
import jwt_decode from "jwt-decode";
import { refreshReducer } from '../../reduxgobalState/rerenderSlice';
import { useDispatch } from 'react-redux';

export function Example({ open, setOpen }) {

    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch()

    // const cancelButtonRef = useRef(true)
    // initialFocus={cancelButtonRef}
    const onSubmit = async (formData) => {
        const token = localStorage.getItem('userToken')
        const decoded = jwt_decode(token)
        UpdateProfile(formData, decoded).then((data) => {
            setOpen(false)
            dispatch(refreshReducer())
        })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 w-full text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                                <div className="bg-white p-5  w-full">
                                    <div className="sm:flex sm:items-start  w-full">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" >
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">

                                            </Dialog.Title>
                                            <div className="mt-10 sm:mt-0">
                                                <div className="md:grid md:grid-cols-1 md:gap-1">
                                                    <div className="mt-5 w-100% md:col-span-2 md:mt-0">
                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="overflow-hidden shadow sm:rounded-md">
                                                                <div className="bg-white w-full px-4 py-5 sm:p-6">
                                                                    <div className="grid grid-cols-6 gap-6">
                                                                        <div className="col-span-6 sm:col-span-3">
                                                                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                                                                User name
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                name="userName"
                                                                                id="name"
                                                                                autoComplete="name"
                                                                                className="mt-1 block w-full rounded-md border-gray-400 bg-sky-100 focus:border-gray-500 focus:ring-gray-500 sm:text-lg"
                                                                                {...register("name", {
                                                                                    required: { value: true, message: "Enter Full Name" },
                                                                                    minLength: { value: 4, message: 'Enter Name' }
                                                                                })}
                                                                            />
                                                                        </div>

                                                                        <div className="col-span-6 sm:col-span-3">
                                                                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                                                                Mobile no
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                name="mobile"
                                                                                id="mobile"
                                                                                autoComplete="phone"
                                                                                className="mt-1  block w-full rounded-md border-gray-300 bg-sky-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                                                                                {...register("mobile", {
                                                                                    required: { value: true, message: "Enter Full Name" },
                                                                                    minLength: { value: 10, message: 'Enter Name' }
                                                                                })}
                                                                            />
                                                                        </div>

                                                                        <div className="col-span-6">
                                                                            <label htmlFor="dateofbirth" className="block text-sm font-medium text-gray-700">
                                                                                Date of birth
                                                                            </label>
                                                                            <input
                                                                                type="date"
                                                                                name="dateofbirth"
                                                                                id="dateofbirth"
                                                                                autoComplete="date"
                                                                                className="mt-1  block w-full rounded-md border-gray-300 bg-sky-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg  "
                                                                                {...register("dateofbirth", {
                                                                                    required: { value: true, message: "Enter Full Name" },
                                                                                    minLength: { value: 4, message: 'Enter Name' }
                                                                                })}
                                                                            />
                                                                        </div>

                                                                        <div className="col-span-6 sm:col-span-4">
                                                                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                                                                                Bio
                                                                            </label>
                                                                            <textarea className='mt-1 block w-full rounded-md border-gray-300 bg-sky-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg'
                                                                                type='text'
                                                                                id='bio'
                                                                                {...register("bio", {
                                                                                    required: { value: true, message: "Enter Full Name" },
                                                                                    minLength: { value: 4, message: 'Enter Name' }
                                                                                })} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    onClick={() => setOpen(false)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    className="imt-3 inline-flex w-full justify-center rounded-md border-transparent  px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                // onClick={() => setOpen(false)}
                                                                >
                                                                    Edit profile
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}