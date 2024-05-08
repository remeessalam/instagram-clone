// import { useState } from 'react'
// import follow from '../../services/follow'
// import unfollow from '../../services/unfollow'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Maping from '../showfollowersandfollowin/datamapping';

export default function Hover({ change, setChange, Contant, Heading }) {

    console.log(Contant)
    
    return (
        <>
            {
                change && (
                    <div className="fixed left-[56%] top-[79%]  -translate-y-[50%] -translate-x-[50%] w-full h-full p-6 ">
                        <div className="flex flex-wrap  modal-content border sm:w-[350px] w-[270px] h-[330px] sm:h-[350px] bg-white mx-auto brightness-100 overflow-y-auto scrollbar-hide" >
                            <div className='w-full flex flex-row  h-8 bg-white border-b border-gray-300 sticky top-0' >
                                <div className='flex items-center justify-center font-bold text-lg w-3/4'>
                                    <h1>{Heading}</h1>
                                </div>
                                <div className='flex w-1/4 justify-end'>
                                    <button className='' onClick={() => setChange(!change)}><ClearSharpIcon /></button>
                                </div>
                            </div>
                            {
                                Heading !== 'Update profile picture' ?
                                    <div className='w-full h-full pt-'>
                                        {
                                            Contant.map((obj, i) => {
                                                return (
                                                    <div key={i} >
                                                        <Maping friends={obj} Heading={Heading} />
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                                    :
                                    <div className='w-full h-full grid grid-cols-3 gap-4 content-center' >
                                        {
                                            Contant.map((obj, i) => {
                                                return (
                                                    <div key={i}>
                                                        <Maping friends={obj} Heading={Heading} change={change} setChange={setChange} />
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                            }
                        </div>
                    </div>
                )
            }
        </>
    )

}