import Home from '../components/home/home'
import SideBar from '../layout/sideBar'


function HomePage() {
    return (
        <>
            <SideBar component={<Home />} />
        </>
    )
}

export default HomePage
