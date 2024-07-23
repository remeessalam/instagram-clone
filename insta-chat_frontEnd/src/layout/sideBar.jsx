import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { useMediaQuery } from "react-responsive";
import Modal from "../components/modal/modal";
import Slide from "../components/searchusers/slideover";
import Notification from "../components/notification/notification";
import { useSelector } from "react-redux";
import { bigScreen } from "../utils/constant";

const SideBar = (props) => {
  const IsBigScreen = useMediaQuery({ query: bigScreen });

  const navigate = useNavigate();

  // const [image, setImage] = useState('')

  const [open, setOpen] = useState(false);

  const [Search, setSearch] = useState(false);

  const [not, setNot] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // console.log(user.user, 'userrrrrrrrr')
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  function logout() {
    localStorage.clear();

    navigate("/login");
  }
  return (
    <>
      {/* MAIN DIV */}
      <div className="flex">
        {/* SIDEBAR DIV */}
        {IsBigScreen ? (
          <div className="flex fixed border-r w-1/4  h-screen border-slate-300">
            {/* <h1>side bar</h1> */}
            <div className="flex flex-col justify-between w-full p-5">
              <h1 className="font-adelia text-4xl text-center font-medium font-black">
                Instachat
              </h1>
              <Link to={"/"}>
                <div className="flex flex-row ml-8  items-center mx-auto w-3/4 hover:bg-gray-100 rounded-full p-1  hover:scale-110  duration-300">
                  <div className="w-12 ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="flex text-align- ml-4 font-bold ">Home</h1>
                  </div>
                </div>
              </Link>

              <div
                className="flex flex-row items-center  w-3/4  ml-8 hover:bg-gray-100 p-1 rounded-full  hover:scale-110  duration-300"
                onClick={() => setSearch(!Search)}
              >
                <div className="w-12 ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="flex text-align- ml-4">Search</h1>
                </div>
              </div>

              <Link to={"/chat"}>
                <div className="flex flex-row items-center w-3/4 ml-8  hover:bg-gray-100 rounded-full p-1  hover:scale-110  duration-300">
                  <div className="w-12 ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="flex text-align- ml-4">Message</h1>
                  </div>
                </div>
              </Link>

              <div
                className="flex flex-row items-center w-3/4 ml-8 hover:bg-gray-100 rounded-full  p-1  hover:scale-110  duration-300"
                onClick={() => setNot(!not)}
              >
                <div className="w-12 ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="flex text-align- ml-4">Notifications</h1>
                </div>
              </div>

              <div
                onClick={() => setOpen(true)}
                className="flex flex-row ml-8 items-center w-3/4  hover:bg-gray-100 rounded-full p-1  hover:scale-110  duration-300 "
              >
                <div className="w-12 ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="flex text-align- ml-4">Create</h1>
                </div>
              </div>

              <Link to={"/profile"}>
                <div className="flex flex-row items-center w-3/4 ml-8 hover:bg-gray-100 rounded-full p-1  hover:scale-110  duration-300">
                  <div className="w-12 ml-4">
                    {user?.user?.image ? (
                      <img
                        className="h-10 w-10 rounded-full aspect-square object-cover"
                        src={user?.user?.image}
                        alt=""
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h1 className="flex text-align- ml-4">Profile</h1>
                  </div>
                </div>
              </Link>

              <button className="flex px-4 py-2" onClick={logout}>
                Log-out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex fixed bottom-0 w-full bg-gray-100 z-10 h-12">
              <div className="flex flex-row items-center justify-around w-full ">
                <Link to={"/"}>
                  <div className="flex  items-center   ">
                    {/* home icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
                <div
                  className="flex  items-center"
                  onClick={() => setSearch(!Search)}
                >
                  {/* search */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Link to={"/chat"}>
                  <div className="flex  items-center ">
                    {/* message */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                </Link>
                <div
                  className="flex  items-center"
                  onClick={() => setNot(!not)}
                >
                  {/* notifications */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <div
                  className="flex  items-center"
                  onClick={() => setOpen(true)}
                >
                  {/* create */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <Link to={"/profile"}>
                  <div className="flex  items-center ">
                    {user?.user?.image ? (
                      <img
                        className="h-10 w-10 rounded-full  object-cover"
                        src={user?.user?.image}
                        alt=""
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </Link>
                <div className="flex  items-center ">
                  <button className="flex px-4 py-2" onClick={logout}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {IsBigScreen && <div className=" w-1/4 "></div>}
        <div className="lg:w-3/4 w-full mx-auto">{props.component}</div>
      </div>
      <Modal open={open} setOpen={setOpen} />
      <Slide open={Search} setOpen={setSearch} />
      <Notification open={not} setOpen={setNot} />
    </>
  );
};
export default SideBar;
