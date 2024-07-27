import { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Modal from "../components/modal/Modal";
import SearchBar from "../components/search/Search";
import { useSelector } from "react-redux";
import { bigScreen, svgIcons } from "../utils/constant";
import useChecktoken from "../hooks/useChecktoken";
import Notification from "../components/notification/Notifications";
import useChangeTab from "../hooks/useChangeTab";

const SideBar = () => {
  const IsBigScreen = useMediaQuery({ query: bigScreen });

  const navigate = useNavigate();

  const location = useLocation();

  const [currentTab, setCurrentTab] = useState({
    home: false,
    search: false,
    chat: false,
    notification: false,
    create: false,
    profile: false,
    more: false,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [Search, setSearch] = useState(false);

  const [not, setNot] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const menuRef = useRef(null);

  // console.log(user.user, 'userrrrrrrrr')
  useChecktoken();

  useEffect(() => {
    const tabName =
      location?.pathname === "/" ? "home" : location?.pathname.slice(1);
    setCurrentTab((prevTabs) => ({
      ...prevTabs,
      [tabName]: true,
    }));
  }, [location]);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    Search && closeSearch();
    not && closeNotification();
  };
  const closeSearch = () => {
    setSearch((pre) => {
      if (pre === true) {
        return false;
      } else {
        return true;
      }
    });
  };
  const closeNotification = () => {
    setNot((pre) => {
      if (pre === true) {
        return false;
      } else {
        return true;
      }
    });
  };

  const handleTabClick = useChangeTab();
  return (
    <>
      {/* MAIN DIV */}
      <div className={`flex fixed  h-screen`}>
        {/* SIDEBAR DIV */}
        {IsBigScreen ? (
          <>
            <div
              className={`relative flex transition-all ease-in-out duration-300 ${
                Search || not ? `w-[80px]` : `w-[244px]`
              } fixed border-r h-screen border-slate-300`}
            >
              <div className={`flex justify-between  flex-col px-3 pt-2 pb-5`}>
                <div>
                  <div
                    className={`${
                      Search || not ? `block` : `block`
                    } mb-5 px-4 pt-6 pb-3`}
                  >
                    {Search || not ? (
                      svgIcons.instagramSidebaricon
                    ) : (
                      <img
                        className="max-w-[103px] h-9"
                        src="/file.png"
                        alt="site name"
                      />
                    )}
                  </div>

                  <Link to={"/"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("home", setCurrentTab);
                      }}
                      className={`flex m-1 p-3 flex-row items-center ${
                        Search || not ? `w-[50px]` : `w-full`
                      }  h-12 hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    >
                      <div className=" w-6">
                        {currentTab.home
                          ? svgIcons.homeIcon
                          : svgIcons.homeIconOutline}
                      </div>
                      <div className={`${Search || not ? `hidden` : `block`}`}>
                        <h1
                          className={`${
                            currentTab.home ? `font-bold text-[16px]` : ` `
                          } flex ml-4 `}
                        >
                          Home
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`flex m-1 p-3 flex-row items-center ${
                      Search || not ? `w-[50px]` : `w-full`
                    } ${
                      currentTab.search ? `border` : ` transition-none`
                    }   hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    onClick={() => {
                      not && closeNotification();
                      setSearch(!Search);
                      handleTabClick("search", setCurrentTab);
                    }}
                  >
                    <div className="">
                      {currentTab.search
                        ? svgIcons.boldSearchIcon
                        : svgIcons.searchIcon}
                    </div>
                    <div className={`${Search || not ? `hidden` : `block`}`}>
                      <h1 className="flex  ml-4">Search</h1>
                    </div>
                  </div>

                  <Link to={"/chat"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("chat", setCurrentTab);
                      }}
                      className={`flex m-1 p-3 ${
                        Search || not ? `w-[50px]` : `w-full`
                      }   flex-row items-center  hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    >
                      <div className="">
                        {currentTab.chat
                          ? svgIcons.filledMessengerIcon
                          : svgIcons.messengerIcon}
                        {console.log(currentTab.chat, "thisisfillms")}
                      </div>
                      <div className={`${Search || not ? `hidden` : `block`}`}>
                        <h1
                          className={`flex ml-4 ${
                            currentTab.chat ? `font-bold text-[16px]` : ` `
                          } `}
                        >
                          Message
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`flex m-1 p-3 ${
                      Search || not ? `w-[50px]` : `w-full`
                    } ${
                      currentTab.notification ? `border` : ``
                    } cursor-pointer flex-row items-center  hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    onClick={() => {
                      Search && closeSearch();
                      setNot(!not);
                      handleTabClick("notification", setCurrentTab);
                    }}
                  >
                    <div className="">
                      {currentTab.notification
                        ? svgIcons.fillnotificationIcon
                        : svgIcons.notificationIcon}
                    </div>
                    <div className={`${Search || not ? `hidden` : `block`}`}>
                      <h1 className="flex ml-4">Notifications</h1>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setOpen(true);
                      handleClose();
                    }}
                    className={`flex flex-row m-1 p-3 ${
                      Search || not ? `w-[50px]` : `w-full`
                    }   items-center hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300 `}
                  >
                    <div className="">{svgIcons.createIcon}</div>

                    <div className={`${Search || not ? `hidden` : `block`}`}>
                      <h1 className="flex ml-4">Create</h1>
                    </div>
                  </div>

                  <Link to={"/profile"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("profile", setCurrentTab);
                      }}
                      className={`flex m-1 p-3 ${
                        Search || not ? `w-[50px]` : `w-full`
                      }    flex-row items-center  hover:bg-gray-100 rounded-lg hover:scale-110  duration-300`}
                    >
                      <div className="">
                        {user?.user?.image ? (
                          <img
                            className={`h-6 w-6 rounded-full aspect-square object-cover ${
                              currentTab.profile
                                ? `w-7 h-7 border-2 border-black`
                                : ``
                            }`}
                            src={user?.user?.image}
                            alt=""
                          />
                        ) : (
                          svgIcons.userIcon
                        )}
                      </div>
                      <div className={`${Search || not ? `hidden` : `block`}`}>
                        <h1
                          className={`flex ml-4 ${
                            currentTab.profile ? `font-bold text-[16px]` : ``
                          }`}
                        >
                          Profile
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>

                {/** login and other menues */}
                <div className="flex w-full h-40 pt-16">
                  <div
                    className="flex flex-row w-full items-center "
                    onClick={handleMenuToggle}
                  >
                    <div className="flex  w-10 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </div>
                    <div className="w-full h-full ml-3">
                      <button className="flex  items-center min-w-full h-full focus:font-bold ">
                        More
                      </button>
                      {isMenuOpen && (
                        <div
                          ref={menuRef}
                          className="absolute bottom-20 left-4 mt-8 bg-white w-72 max-h-96 rounded-md shadow-custom"
                        >
                          {/* Menu content */}
                          <ul className="flex flex-col mt-5  items-center justify-center ">
                            <li className="py-3  pl-4 w-64 h-12 active:bg-gray-300 text-start text-sm justify-center hover:bg-gray-200 rounded-md">
                              <div className="flex flex-row items-center w-full gap-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.7}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                  />
                                </svg>
                                <button className="w-full text-start">
                                  Switch appearance
                                </button>
                              </div>
                            </li>
                            <li className="py-3 pl-4 w-64 h-12 active:bg-gray-300 text-start text-sm justify-center hover:bg-gray-200 rounded-md">
                              <div className="flex flex-row items-center w-full gap-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                  />
                                </svg>
                                <button className="w-full text-start">
                                  Saved
                                </button>
                              </div>
                            </li>
                            <div className="w-full h-full  border-b-[6px] pb-2 border-sideBarMenuBorderColor"></div>
                            {/* <div className="w-64 h-full pt-2 mb-5  border-slate-50"> */}
                            <li className="py-1 pl-4 w-64 flex mt-2 h-12 border-slate-50 active:bg-gray-300 text-start text-sm items-center hover:bg-gray-200 rounded-md">
                              <button className="w-full text-start">
                                Switch accounts
                              </button>
                            </li>
                            <hr className="w-full border-[1px] mt-2 mb-2 border-sideBarMenuBorderColor" />
                            <li className="flex py-1 pl-4 w-64  mb-5 border-slate-50 h-12 active:bg-gray-300  text-sm justify-center hover:bg-gray-200 rounded-md">
                              <button
                                className="w-full text-start"
                                onClick={logout}
                              >
                                log out
                              </button>
                            </li>
                            {/* </div> */}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* <button className="flex px-4 py-2" onClick={logout}>
                  Log-out
                </button> */}
              </div>
              <SearchBar
                open={Search}
                setOpen={setSearch}
                handleClose={handleClose}
              />
              <Notification open={not} setOpen={setNot} />
            </div>
          </>
        ) : (
          <div>
            <div className="flex fixed bottom-0 w-full bg-gray-100 z-10 h-12">
              <div className="flex flex-row items-center justify-around w-full ">
                <Link to={"/"}>
                  <div className="flex  items-center   ">
                    {/* home icon */}
                    {svgIcons.homeIcon}
                  </div>
                </Link>
                <div
                  className="flex  items-center"
                  onClick={() => setSearch(!Search)}
                >
                  {/* search */}
                  {svgIcons.searchIcon}
                </div>
                <Link to={"/chat"}>
                  <div className="flex  items-center ">
                    {/* message */}
                    {svgIcons.messengerIcon}
                  </div>
                </Link>
                <div
                  className="flex  items-center"
                  onClick={() => setNot(!not)}
                >
                  {/* notifications */}
                  {svgIcons.notificationIcon}
                </div>
                <div
                  className="flex  items-center"
                  onClick={() => setOpen(true)}
                >
                  {/* create */}
                  {svgIcons.createIcon}
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
      </div>
      <Modal open={open} setOpen={setOpen} />
    </>
  );
};
export default SideBar;
