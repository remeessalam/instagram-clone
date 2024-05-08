import { Fragment, useState, memo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import uploadImage from '../../services/imageUpload'
import InsertPost from '../../services/uploadPost'


export default memo(function Modal({ open, setOpen }) {

    const [urls, setUrls] = useState([])

    const [images, setImages] = useState([])

    const [caption, setCaption] = useState('')

    // const cancelButtonRef = useRef(true);

    const [error, setError] = useState('')

    // useEffect(() => {
    //     console.log(urls, 'useeffent urls console')
    // }, [urls])

    function uploadPhoto(e) {
        const files = Object.values(e.target.files)
        // console.log(e.target.files, 'kkkkk');
        uploadImage(files).then((data) => {
            setUrls(data)
            // console.log(urls, 'data urls')
        }).catch((err) => {
            // console.log(err, "catch errrr")
            setError(err)
        })

        files.forEach((img) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result]);
            };
        });
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>


                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center  p-4 w-full text-center items-center sm:p-0 ">

                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:max-w-xl p-5">
                            <div className="bg-white p-1 md:w-[500px] w-[290px] h-full ">
                                <div className="sm:flex sm:items-start  w-full">
                                    <div as="h3" className="text-lg font-medium leading-6 text-gray-900 fixed">
                                        <div className='relative right-0 sm:p-1 p-6'>
                                            <button
                                                type="button"
                                                className="inline-flex  fixed top-0 right-0 p-1  text-base font-medium text-black  "
                                                onClick={() => {
                                                    setImages([])
                                                    setOpen(false)
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>


                                            </button>
                                        </div>
                                    </div>
                                    {
                                        images && images.length ? (<div className='border-2 p-2  rounded-md '>
                                            <div className='flex justify-end border-b-2 w-full mr-7 mb-1'>
                                                {urls.length ?
                                                    <button className=' m-1  text-sky-500 text-sm font-bold ' onClick={() => {
                                                        InsertPost(urls, caption)
                                                        setOpen(false)
                                                        setImages([])
                                                    }}
                                                    >Share</button>
                                                    :
                                                    <button className=' m-1  text-sky-100 text-sm font-bold cursor-wait' onClick={() => {
                                                        // InsertPost(urls)
                                                        // setOpen(false)
                                                        // setImages([])
                                                    }}
                                                    >Share</button>
                                                }
                                            </div>
                                            <div className='flex flex-col mx-auto md:w-[450px] w-[210px] overflow-x-auto snap-x snap-mandatory scrollbar-hide'>
                                                {
                                                    !error ?
                                                        <>
                                                            {

                                                                images.map((img) => (
                                                                    <div className=' w-full snap-always snap-center'>
                                                                        <img className='mb-3 w-full max-h-96 object-cover' src={img} alt="" />
                                                                    </div>
                                                                ))

                                                            }
                                                            <input className='w-full h-16 focus:outline-0' type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Write a caption' />
                                                        </>
                                                        :
                                                        <div className='mx-auto min-w-full'>
                                                            <h1>please select another image!</h1>
                                                        </div>
                                                }
                                                {
                                                    error ?
                                                        <h1>{error[0]}</h1>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>) :
                                            (<div className="mt-3 text-center  w-full h-full" >
                                                <div className="max-h-full  p-4 border flex flex-col m-2 ">
                                                    <h1 >insert image</h1>

                                                    <div className="flex  justify-center text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer p-3 rounded-md bg-sky-600 font-medium text-white  hover:pointer"
                                                        >
                                                            <span>Select photos and videos</span>
                                                            <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={uploadPhoto} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>)
                                    }
                                </div>
                            </div>
                        </Dialog.Panel>

                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
})





