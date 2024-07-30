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

function Content() {
  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([]);

  const refresh = useSelector((state) => state.app.refresh);

  useChecktoken("/");

  useEffect(() => {
    allpost().then((data) => {
      setPost(data.data.post);
      // console.log(data, 'home useEffect')
    });
    allusers().then((data) => {
      console.log(data.data.user, 'user data"s multiple');
      setUsers(data.data.user);
    });
  }, [refresh]);

  const IsBigScreen = useMediaQuery({ query: bigScreen });

  return (
    <div className="flex flex-col w-full  m-1 p-2">
      {/* STORY DIV */}
      <div>
        <Story />
      </div>

      {/* POST AND FRIEND DIV  */}

      <div className="flex ml-4 mr-4 h-5/6">
        {/* POST DIV */}

        <div className="flex flex-col mx-auto md:w-3/4 p-2  w-full   overflow-x-auto scrollbar-hide h-100%  ">
          {post.map((post) => (
            <Post key={post._id} e={post} />
          ))}
        </div>

        {/* FRIEND DIV */}

        {IsBigScreen && (
          <div className="flex flex-col   w-1/4  h-100%   overflow-y-auto scrollbar-hide ">
            <div className=" w-full  h-100%">
              <h1 className=" mt-7 text-sx font-semibold text-gray-500">
                Suggestions For You
              </h1>
              {users?.map((obj) => {
                console.log(obj, "thisisobj");
                return <Friend key={obj._id} frnd={obj} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
