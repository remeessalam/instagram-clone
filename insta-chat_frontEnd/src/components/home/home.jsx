import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import allpost from "../../services/allpost";
import allusers from "../../services/allusers";
import Post from "../post/Post";
import Friend from "../suggestion/Suggestion";
import { useSelector } from "react-redux";
import { bigScreen } from "../../utils/constant";
import useChecktoken from "../../hooks/useChecktoken";
import Story from "./child-components/Story";
import { Link } from "react-router-dom";

function Content() {
  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([]);

  const refresh = useSelector((state) => state.app.refresh);

  const { user } = useSelector((state) => ({ ...state }));

  useChecktoken("/");

  useEffect(() => {
    allpost().then((data) => {
      setPost(data.data.post);
    });
    allusers().then((data) => {
      setUsers(data.data.user);
    });
  }, [refresh]);

  const IsBigScreen = useMediaQuery({ query: bigScreen });

  return (
    <div className="flex justify-center flex-row w-full h-[99vh] overflow-y-scroll  m-1 p-2 scrollbar-hide">
      {/* POST AND FRIEND DIV  */}

      <div className="flex flex-col w-[702px] ml-4 mr-4   ">
        {/* POST DIV */}
        {/* STORY DIV */}
        {IsBigScreen && (
          <div className="flex justify-center">
            <Story />
          </div>
        )}

        <div className={`flex flex-col mx-auto w-[702px] p-2 h-100%  `}>
          {post.map((post) => (
            <Post key={post._id} e={post} />
          ))}
        </div>

        {/* FRIEND DIV */}
      </div>

      {IsBigScreen && (
        <div className="flex flex-col pl-16 mt-9  w-1/4  h-100% overflow-y-auto">
          <div className="flex w-full flex-row justify-between">
            <div className="flex w-full flex-row items-center cursor-pointer">
              <Link className="" to={`/profile`}>
                {user?.user?.image ? (
                  <div className="w-[44px] h-[44px] rounded-full">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user?.user?.image}
                      alt="profile pic"
                    />
                  </div>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="1 1 23 23"
                      fill="currentColor"
                      className="w-14 h-14"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </Link>

              <div className="ml-1 flex justify-between items-center w-full">
                <Link className="" to={`/profile`}>
                  <div>
                    <h1 className="text-[14px] ml-2 font-semibold text-gray-900">
                      {user?.user?.username}
                    </h1>
                    <h1 className="text-[15px] ml-2 font-normal text-gray-500">
                      {user?.user?.name}
                    </h1>
                  </div>
                </Link>
                <h1 className="text-[14px] ml-2 font-semibold text-blue-400">
                  Switch
                </h1>
              </div>
            </div>
          </div>
          <div className=" w-full  h-100%">
            <div className="flex justify-between items-center">
              <h1 className=" mt-7 text-sm font-semibold text-gray-500">
                Suggestions For You
              </h1>
              <h1 className="cursor-pointer mt-7 text-xs font-semibold text-gray-900 hover:text-gray-500">
                Sell All
              </h1>
            </div>
            <div className=" flex flex-col gap-2 mt-4 pl-1">
              {users?.map((obj) => {
                return <Friend key={obj._id} frnd={obj} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
