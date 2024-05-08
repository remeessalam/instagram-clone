import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ShowProfile from '../components/showuser/showuser'
import SideBar from '../layout/sideBar'




export function Showuser() {
    const { id } = useParams()
    useEffect(() => {
        console.log(id, 'id frnd')
    }, [id])

    return (
        <>
            <SideBar component={<ShowProfile id={id} />} />
        </>
    )
}
