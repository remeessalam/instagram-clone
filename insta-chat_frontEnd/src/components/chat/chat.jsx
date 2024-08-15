import { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import getfollowing from "../../services/getfollowers";
import getchat from "../../services/getchat";
import Moment from "react-moment";
import addmessage from "../../services/addmessage";
import { useNavigate } from "react-router-dom";
import { svgIcons } from "../../utils/constant";
export default function Chat({ Socket }) {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [topic, setTopic] = useState("");
  const [chatroom, setChatroom] = useState({});
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    !token && navigate("/login");
  }, [navigate]);

  useEffect(() => {
    getfollowing().then((data) => {
      setUser(data?.data?.user);
    });
  }, []);

  const createchat = (id) => {
    getchat(id).then((data) => {
      Socket.emit("join_room", { roomId: data?.data?.chatdetail?._id });
      setChatroom(data?.data?.chatdetail);
      setMessage(data?.data?.chatdetail?.messages);
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
    Socket.emit("client-to-server", chat);
    addmessage(chat);
    setMessage([chat, ...message]);
    setTopic("");
  };

  useEffect(() => {
    Socket.on("server-to-client", (data) => {
      setMessage((message) => [data, ...message]);
    });
    return () => Socket.off("server-to-client");
  }, [Socket]);

  return (
    <div className=" w-chatPageContainer h-full   ">
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
