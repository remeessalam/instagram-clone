import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import allpost from "../../services/allpost";
import allusers from "../../services/allusers";

import Post from "../post/post";
import Friend from "../suggestion/suggestion";
import { useSelector } from "react-redux";
import { bigScreen } from "../../utils/constant";
import useChecktoken from "../../hooks/useChecktoken";

function Content() {
  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([]);

  const refresh = useSelector((state) => state.refresh.refresh);

  useChecktoken("/");

  useEffect(() => {
    allpost().then((data) => {
      setPost(data.data.post);
      // console.log(data, 'home useEffect')
    });
    allusers().then((data) => {
      // console.log(data.data.user, 'user data"s multiple')
      setUsers(data.data.user);
    });
  }, [refresh]);

  const IsBigScreen = useMediaQuery({ query: bigScreen });

  return (
    <div className="flex flex-col w-full  m-1 p-2">
      {/* STORY DIV */}
      {/* < div className='flex  h-28 w-full rounded-md border cursor-not-allowed border-slate-300' >

                <div className='flex justify-start overflow-x-auto scrollbar-hide gap-1 mt-2 ml-2'>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-600" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                        <h1 className='truncate  h-8 font-normal text-xs'>WORKING</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                        <h1 className='truncate  h-8 font-normal text-xs'>ON IT</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>
                    <div className='flex flex-col w-16 m-1'>
                        <img className="rounded-full aspect-square border-2 border-red-400" src="https://res.cloudinary.com/domqbgvw6/image/upload/v1669275021/tether/tklrjgkrbuvmpoonswvg.png" alt="" />
                        <h1 className='truncate h-8 font-normal text-xs'>remees salam</h1>
                    </div>

                </div>
            </div > */}

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
              {users?.map((obj) => (
                <Friend key={obj._id} frnd={obj} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
