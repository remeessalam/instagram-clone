import Profile from '../components/profile/profile'
import SideBar from '../layout/sideBar'




export function ProfilePage() {
    return (
        <>
            <SideBar component={<Profile />} />
        </>
    )
}


