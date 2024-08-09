import { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import getfollowing from "../../services/getfollowers";
import getchat from "../../services/getchat";
import Moment from "react-moment";
import addmessage from "../../services/addmessage";
import { useNavigate } from "react-router-dom";
import { bigScreen, svgIcons } from "../../utils/constant";
export default function Chat({ Socket }) {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [topic, setTopic] = useState("");
  const [chatroom, setChatroom] = useState({});
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  // const IsBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  // useEffect(() => {
  //     console.log(chat, 'chat chateeeee')
  // }, [chat])
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    !token && navigate("/login");
  }, [navigate]);

  useEffect(() => {
    getfollowing().then((data) => {
      // console.log(data.data.user, '=====----====')
      setUser(data?.data?.user);
    });
  }, []);

  const createchat = (id) => {
    getchat(id).then((data) => {
      // console.log(data.data.chatdetail)
      Socket.emit("join_room", { roomId: data?.data?.chatdetail?._id });
      setChatroom(data?.data?.chatdetail);
      // console.log(chatroom ,'data in create chatroom')
      setMessage(data?.data?.chatdetail?.messages);
      // console.log(message,'message')
      setTopic("");
    });
  };
  const sendChat = () => {
    let chat = {
      roomId: chatroom._id,
      text: topic,
      time: new Date(),
      author: user[0]._id,
    };
    // console.log(user[0]._id,'jalsdjflajsvlhasvhfljflvsjvcskvbf')
    Socket.emit("client-to-server", chat);
    addmessage(chat);
    setMessage([chat, ...message]);
    setTopic("");
  };

  useEffect(() => {
    Socket.on("server-to-client", (data) => {
      // console.log(data, 'return messagesssss')
      setMessage((message) => [data, ...message]);
    });
    return () => Socket.off("server-to-client");
  }, [Socket]);

  return (
    <div className=" w-chatPageContainer h-full  -ml-[160px] ">
      <div className="flex flex-wrap w-full h-full min-h-[100vh]">
        <div className={`bg-white w-1/4 max-h-full  overflow-hidden border-r `}>
          <div className="absalute w-full  h-16 ">
            <div className="flex felx-row w-full items-center h-16 ">
              <div className="sm:w-full w-1 px-6 pt-8 pb-3  md:visible invisible">
                <h1 className="text-lg font-extrabold text-black">
                  {user[0]?.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex justify-between px-6 py-3">
            <h4 className="text-md font-extrabold text-black">Messages</h4>{" "}
            <h4 className="font-semibold text-gray-400">Requests</h4>
          </div>

          <div className="flex flex-col max-h-full px-6  py-3 justify-center overflow-y-auto scrollbar-hide">
            {user[0]?.following?.map((obj, i) => {
              return (
                <div
                  key={obj._id}
                  className="flex sm:flex-row flex-col items-center sm:h-16 h-24 "
                  onClick={() => {
                    setChat([obj]);
                    createchat(obj._id);
                  }}
                >
                  <div className="sm:max-w-[56px]  w-full ">
                    {obj.image ? (
                      <img
                        className="min-w-full h-14 rounded-full object-cover"
                        src={obj.image}
                        alt={obj.name}
                      />
                    ) : (
                      svgIcons.userIconfivesix
                      //   <svg
                      //     xmlns="http://www.w3.org/2000/svg"
                      //     viewBox="1 1 22 22"
                      //     fill="currentColor"
                      //     className="w-14 h-14"
                      //   >
                      //     <path
                      //       fillRule="evenodd"
                      //       d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      //       clipRule="evenodd"
                      //     />
                      //   </svg>
                    )}
                  </div>

                  <div className="flex flex-row ml-2  w-full ">
                    <h1 className="truncate max-w-[230px]">{obj.name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!chat?.length ? (
          <div className="grid w-3/4 h-[700px] bg-white justify-center content-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-400">
                start sending messages
              </h1>
              {/* <h1 className="text-center">{message.map((obj) => {
                                    return (<h1>{message}</h1>)
                                })}</h1> */}
            </div>
          </div>
        ) : (
          <div className="w-3/4 bg-white ">
            <div className="flex flex-wrap w-full h-[75px] items-center  border-b">
              <div className="flex felx-row items-center w-1/4 h-16 pl-2">
                <div className="sm:w-[56px] w-full ">
                  {chat[0].image ? (
                    <img
                      className="w-14 h-14 rounded-full object-cover"
                      src={chat[0].image}
                      alt={chat[0].name}
                    />
                  ) : (
                    svgIcons.userIconfivesix
                    // <svg
                    //   viewBox="2.3 2.3 27 27"
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   fill="currentColor"
                    //   //   className="w-14 h-14 bg-slate-500"
                    //   width={56}
                    //   height={56}
                    // >
                    //   <path
                    //     fillRule="evenodd"
                    //     d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    //     clipRule="evenodd"
                    //     transform="scale(1.32)"
                    //   />
                    // </svg>
                  )}
                </div>
                <div className="sm:w-3/4 w-1 ml-2 md:visible invisible text-lg font-medium text-black">
                  <h1>{chat[0].name}</h1>
                </div>
              </div>
              <div className="flex justify-center w-1/2 p-5 ">
                <h1 className="text-center">online</h1>
              </div>
            </div>
            <div className="w-full md:h-chatPageMsgContentHight sm:h-chatPageMsgContentHightMedium h-chatPageMsgContentHightMedium overflow-x-auto scrollbar-hide flex flex-col-reverse">
              {message?.map((obj, i) => {
                return (
                  <div
                    key={i}
                    className={`p-3 flex ${
                      user[0]?._id === obj.author
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div>
                      <div
                        className={` min-w-[100px] max-w-[700px] min-h-[50px] flex flex-col  ${
                          user[0]?._id === obj.author
                            ? "bg-gray-200"
                            : "bg-white  border border-gray-300"
                        } rounded-full grid place-content-center`}
                      >
                        <h1
                          className={`text-sm w-full flex justify-center  p-4 text-center`}
                        >
                          {obj?.text}
                        </h1>
                      </div>
                      <div
                        className={`flex ${
                          user[0]?._id === obj.author
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`w-16 min-h-16 flex flex-col bg-gray-200  justify-center m-1 rounded-full ${
                            user[0]?._id === obj.author
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          <span className="h-4 flex justify-center text-xs ">
                            <Moment date={obj.time} format="hh:mm a" trim />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center w-full  bg-white h-[53px] pb-2">
              <div className="flex flex-row w-3/4 max-h-[44px] border border-gray-200 rounded-full overflow-hidden">
                <input
                  className="w-full h-full focus:outline-0 ml-4"
                  type="text"
                  placeholder="Message..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <button
                  className="mr-3 text-sx font-semibold text-blue-400 "
                  onClick={sendChat}
                >
                  send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
