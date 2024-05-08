import { Fragment, useState, } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import notification from '../../services/getnotification'
import Time from '../showposttime/addedtime'
export default function Notification({ open, setOpen }) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        notification().then(((data) => {
            setNotifications(data.data.data)
            // console.log(notifications, 'jsx notification================================================================')
        }))
    }, [open])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col relative  overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className=" px-4 sm:px-6">
                                            <Dialog.Title className=" text-2xl font-bold text-gray-900">Notifications</Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {/* Replace with your content */}
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <div className="h-full " aria-hidden="true" >
                                                    <div>
                                                        <div className='flex flex-row justify-start   border-gray-200 p-1 w-full'>
                                                            <div className='w-full overflow-y-auto overflow-hidden scrollbar-hide'>

                                                                {
                                                                    notifications?.posts?.map((obj, i) => {
                                                                        return (

                                                                            <div key={i} className='flex justify-start justify-between items-center w-full mb-2'>
                                                                                {
                                                                                    obj.posteduser?.image ?
                                                                                        <img className=' w-11 h-11 object-cover rounded-full' src={obj.posteduser?.image} alt="sorry" />
                                                                                        :
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
                                                                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                                                        </svg>

                                                                                }
                                                                                <h1 className='mr-2 text-xs'>{obj.posteduser?.name}</h1>
                                                                                <h1 className='text-xs'>add new photo.<Time time={obj.time} />ago</h1>
                                                                                <img className="ml-2  w-11 h-11 object-cover" src={obj.post?.image[0]?.url} alt="" />

                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>


                                                        </div>

                                                        <div>
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
                </div>
            </Dialog>
        </Transition.Root>
    )
}
