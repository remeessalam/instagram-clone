import SideBar from "../layout/sideBar";
import Chat from '../components/chat/chat'

export default function Chatpage({ Socket }) {

    return (
        <SideBar component={<Chat Socket={Socket} />} />
    )
}