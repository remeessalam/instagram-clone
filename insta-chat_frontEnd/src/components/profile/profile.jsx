import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Example } from "../editprofile/ProfileEditModal";
import Getpost from "../../services/getpost";
import Getuser from "../../services/getuser";
import Hover from "../Smallmodal/ModalSec";
import { useSelector } from "react-redux";
import { bigScreen, svgIcons } from "../../utils/constant";
import useChecktoken from "../../hooks/useChecktoken";

function Profile() {
  const IsBigScreen = useMediaQuery({ query: bigScreen });

  const [hopen, setHopen] = useState(false);

  const [open, setOpen] = useState(false);

  const [post, setPost] = useState([]);

  const [userDetails, setUser] = useState({});

  const [heading, setHeading] = useState("");

  const [hoverdata, setHoverdata] = useState([]);

  const [tab, setTab] = useState("post");

  useChecktoken("/profile");

  useEffect(() => {
    Getpost().then((data) => {
      setPost(data.data.data);
    });
    Getuser().then((userdata) => {
      setUser(userdata.data.user);
    });
  }, []);
  function hovercontant(data, text) {
    setHopen(!hopen);

    setHoverdata(data);
    setHeading(text);
  }
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      <div className="flex justify-center w-full  h-screen lg:pt-10 pt-2  mx-auto overflow-y-auto scrollbar-hide">
        <div className="flex flex-col w-[975px] shrink h-full m-2">
          {/**PROFILE details area */}
          {IsBigScreen ? (
            <div className="flex justify-center flex-row  min-h-1/2 p-1 sm:p-4">
              <div className="sm:w-[283px] shrink w-screen cursor-pointer flex justify-center items-center">
                {user?.user?.image ? (
                  <img
                    onClick={() => hovercontant(post, "Update profile picture")}
                    className="rounded-full border border-borderColor h-[150px] w-[150px] object-cover"
                    src={user?.user?.image}
                    alt=""
                  />
                ) : (
                  <svg
                    onClick={() => hovercontant(post, "Update profile picture")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-56 h-56"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => hovercontant(post, "Update profile picture")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg> */}
              </div>
              <div className="flex flex-col shrink w-[623px]">
                <div className="flex flex-row m-4">
                  <div>
                    <h1 className="mr-7 font-normal text-3xl cursor-default">
                      {user?.user?.name}
                    </h1>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    className="flex rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer justify-items-center px-3 py-0 md:3"
                  >
                    <h1 className="self-center text-sm font-semibold">
                      Edit profile
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row  m-4">
                  <h1 className="mr-7 cursor-default">
                    <span className="font-semibold text-lg">
                      {post?.length}{" "}
                    </span>{" "}
                    posts
                  </h1>
                  <h1
                    className="mr-7 cursor-pointer"
                    onClick={() =>
                      hovercontant(userDetails?.followers, "Followers")
                    }
                  >
                    <span className="font-semibold text-lg">
                      {" "}
                      {userDetails?.followers?.length}{" "}
                    </span>
                    followers
                  </h1>
                  <h1
                    className="cursor-pointer"
                    onClick={() =>
                      hovercontant(userDetails?.following, "Following")
                    }
                  >
                    <span className="font-semibold text-lg">
                      {" "}
                      {userDetails?.following?.length}{" "}
                    </span>
                    following
                  </h1>
                </div>
                <div className="flex flex-row  m-4">
                  <p>{userDetails?.bio}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col  h-1/2 p-1 lg:p-5">
              <div className="sm:w-1/4 w-full m-1">
                {userDetails.image ? (
                  <img
                    className="rounded-full h-56 w-56 border-red-400 object-cover"
                    src={userDetails.image}
                    alt=""
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-56 h-56"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => hovercontant(post, "Update profile picture")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>

              <div className="flex flex-col w-3/4 m-5">
                <div className="flex flex-row ">
                  <div>
                    <h1 className="mr-7 font-normal md:text-3xl text:xl ">
                      {user?.user?.name}
                    </h1>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    className="flex rounded bg-gray-200 hover:bg-gray-300 cursor-pointer justify-items-center p-1"
                  >
                    <h1 className="self-center">edit profile</h1>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <h1 className="mr-7 cursor-default">post {post?.length}</h1>
                  <h1
                    className="mr-7 cursor-pointer"
                    onClick={() =>
                      hovercontant(userDetails.followers, "Followers")
                    }
                  >
                    followers {userDetails.followers?.length}{" "}
                  </h1>
                  <h1
                    className="cursor-pointer"
                    onClick={() =>
                      hovercontant(userDetails.following, "Following")
                    }
                  >
                    following {userDetails.following?.length}
                  </h1>
                </div>
                <div>
                  <p>{user?.bio}</p>
                </div>
              </div>
            </div>
          )}
          {/** TAB */}
          <div className="flex w-full justify-center border-t">
            <div
              className={`cursor-pointer mx-8 h-14 border-t border-t-transparent   flex items-center font-semibold text-sm  ${
                tab === "post"
                  ? `border-t border-t-black text-black`
                  : `text-gray-500 `
              }`}
              onClick={() => setTab("post")}
            >
              <span className="mr-2 ">{svgIcons.postsIcon}</span> POST
            </div>
            <div
              className={`cursor-pointer mx-8 h-14 font-semibold text-sm border-t border-t-transparent flex items-center  ${
                tab === "saved"
                  ? `border-t border-t-black text-black`
                  : `text-gray-500`
              }`}
              onClick={() => setTab("saved")}
            >
              <span className="mr-2">{svgIcons.savedIcon}</span>
              SAVED
            </div>
            <div
              className={`cursor-pointer mx-8 h-14 font-semibold text-sm border-t border-t-transparent flex items-center  ${
                tab === "tagged"
                  ? `border-t border-t-black text-black`
                  : `text-gray-500`
              }`}
              onClick={() => setTab("tagged")}
            >
              <span className="mr-2">{svgIcons.tagedIcon}</span>
              TAGGED
            </div>
          </div>

          {/** POST  */}
          {/* <div className="w-[975px] shrink"> */}
          <div className=" grid grid-cols-3 gap-1 min-h-full">
            {post.map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex bg-green-300 cursor-pointer aspect-square group"
                >
                  <div className="">
                    <img
                      className="aspect-square h-full group-hover:brightness-50 object-cover  "
                      src={e.image[0]?.url}
                      alt=""
                    />
                    <div className="w-4 h-4 -mt-[315px] ml-[287px]">
                      {e.image.length > 1 && svgIcons.stackIcon}
                    </div>

                    <div
                      className={`flex text-white flex-row  mt-[130px] mx-[110px] z-100  opacity-0 ${``} group-hover:brightness-200 group-hover:opacity-100 `}
                    >
                      <div className="flex flex-row">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-6 h-6"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>

                        {e.Likes.length ? (
                          <h1 className="text-lg text-white font-bold ml-2 mr-2">
                            {e.Likes.length}
                          </h1>
                        ) : (
                          <h1 className="text-lg font-bold ml-2 mr-2"> 0</h1>
                        )}
                      </div>
                      <div className="flex flex-row">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {
                          <h1 className="text-lg font-bold ml-2">
                            {e.comments.length}
                          </h1>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* </div> */}
          <div className="h-5"></div>
        </div>
        <Example open={open} setOpen={setOpen} />
        <Hover
          change={hopen}
          setChange={setHopen}
          Contant={hoverdata}
          Heading={heading}
        />
      </div>
    </>
  );
}
export default Profile;
