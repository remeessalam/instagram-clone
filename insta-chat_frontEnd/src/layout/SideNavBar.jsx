import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Modal from "../components/modal/Modal";
import SearchBar from "../components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import { bigScreen, forSideBar, svgIcons } from "../utils/constant";
import useChecktoken from "../hooks/useChecktoken";
import Notification from "../components/notification/Notifications";
import useChangeTab from "../hooks/useChangeTab";
import SideBarMenu from "./SideBarMenu";
import { closeModal, openModal } from "../reduxgobalState/slices/modalslice";

const SideBar = () => {
  const IsBigScreen = useMediaQuery({ query: bigScreen });
  const forSide = useMediaQuery({ query: forSideBar });
  const openModalState = useSelector((state) => state.modal.openModalState);

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

  const [Search, setSearch] = useState(false);

  const [not, setNot] = useState(false);

  const [chat, setChat] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
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

  // const handleMenuToggle = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };
  useEffect(() => {
    location?.pathname === "/chat" ? setChat(true) : setChat(false);
  }, [location?.pathname]);
  const handleClose = () => {
    Search && closeSearch();
    not && closeNotification();
    // chat || (!location?.pathname === "/chat" && closeChat());
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

  const allCondition = Search || not || chat || !forSide;

  const handleTabClick = useChangeTab();
  return (
    <>
      {/* MAIN DIV */}
      <div className={`flex   h-screen`}>
        {/* SIDEBAR DIV */}
        {IsBigScreen ? (
          <>
            <div
              className={`flex transition-all ease-in-out duration-300 ${
                allCondition ? `w-[80px]` : `w-[244px]`
              }  border-r h-screen border-slate-300`}
            >
              <div className={`flex justify-between w-full flex-col pt-2 pb-5`}>
                <div className="flex flex-col ">
                  <div
                    className={`${
                      Search || not ? `block` : `block`
                    } mb-5 pt-6 pb-3 text-center ${
                      allCondition ? `mx-auto` : ``
                    }`}
                  >
                    <Link className="" to={"/"}>
                      {allCondition ? (
                        <div
                          className={`${
                            allCondition
                              ? `flex justify-center h-9 w-[55px]`
                              : ``
                          }`}
                        >
                          {svgIcons.instagramSidebaricon}{" "}
                        </div>
                      ) : (
                        <img
                          className="max-w-[103px] h-9 ml-[16px]"
                          src="/file.png"
                          alt="site name"
                        />
                      )}
                    </Link>
                  </div>

                  <Link className="group" to={"/"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("home", setCurrentTab);
                      }}
                      className={`flex m-1 p-3 flex-row items-center ${
                        allCondition ? `w-[70px]` : ``
                      }  h-12 hover:bg-gray-100 rounded-lg   `}
                    >
                      <div
                        className={`${
                          allCondition ? `mx-auto` : ``
                        } w-6 group-hover:scale-110 duration-300`}
                      >
                        {currentTab.home
                          ? svgIcons.homeIcon
                          : svgIcons.homeIconOutline}
                      </div>
                      <div className={`${allCondition ? `hidden` : `block`}`}>
                        <h1
                          className={`${
                            currentTab.home ? `font-bold ` : ` `
                          } flex ml-4 text-[16px]`}
                        >
                          Home
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`flex m-1 p-3 flex-row items-center group ${
                      allCondition ? `w-[70px]` : ``
                    } ${
                      currentTab.search ? `border` : ` `
                    }   hover:bg-gray-100 rounded-lg `}
                    onClick={() => {
                      not && closeNotification();
                      setSearch(!Search);
                      handleTabClick("search", setCurrentTab);
                    }}
                  >
                    <div
                      className={`${
                        allCondition ? `mx-auto` : ``
                      } group-hover:scale-110 duration-300`}
                    >
                      {currentTab.search
                        ? svgIcons.boldSearchIcon
                        : svgIcons.searchIcon}
                    </div>
                    <div className={`${allCondition ? `hidden` : `block`}`}>
                      <h1 className="flex  ml-4">Search</h1>
                    </div>
                  </div>

                  <Link className="group" to={"/chat"}>
                    <div
                      onClick={() => {
                        // setChat(!chat);
                        handleClose();
                        handleTabClick("chat", setCurrentTab);
                      }}
                      className={`flex m-1 p-3 ${
                        allCondition ? `w-[70px]` : ``
                      }  ${
                        currentTab.chat ? `border` : ``
                      } flex-row items-center  hover:bg-gray-100 rounded-lg`}
                    >
                      <div
                        className={`${
                          allCondition ? `mx-auto` : ``
                        } group-hover:scale-110 duration-300`}
                      >
                        {currentTab.chat
                          ? svgIcons.filledMessengerIcon
                          : svgIcons.messengerIcon}
                      </div>
                      <div className={`${allCondition ? `hidden` : `block`}`}>
                        <h1
                          className={`flex ml-4 text-[16px] ${
                            currentTab.chat ? `font-bold ` : ` `
                          } `}
                        >
                          Message
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`flex m-1 p-3 group ${
                      allCondition ? `w-[70px]` : ``
                    } ${
                      currentTab.notification ? `border` : ``
                    } cursor-pointer flex-row items-center  hover:bg-gray-100 rounded-lg `}
                    onClick={() => {
                      Search && closeSearch();
                      setNot(!not);
                      handleTabClick("notification", setCurrentTab);
                    }}
                  >
                    <div
                      className={`${
                        allCondition ? `mx-auto` : ``
                      } group-hover:scale-110 duration-300`}
                    >
                      {currentTab.notification
                        ? svgIcons.fillnotificationIcon
                        : svgIcons.notificationIcon}
                    </div>
                    <div className={`${allCondition ? `hidden` : `block`}`}>
                      <h1 className="flex ml-4">Notifications</h1>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      dispatch(openModal());
                      // setOpen(true);
                      handleClose();
                    }}
                    className={`flex flex-row m-1 p-3 cursor-pointer ${
                      allCondition ? `w-[70px]` : ``
                    } group  items-center hover:bg-gray-100 rounded-lg`}
                  >
                    <div
                      className={`${
                        allCondition ? `mx-auto` : ``
                      } group-hover:scale-110 duration-300`}
                    >
                      {svgIcons.createIcon}
                    </div>

                    <div className={`${allCondition ? `hidden` : `block`}`}>
                      <h1 className="flex ml-4 text-[16px]">Create</h1>
                    </div>
                  </div>

                  <Link className="group" to={"/profile"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("profile", setCurrentTab);
                      }}
                      className={`flex m-1 p-3 ${
                        allCondition ? `w-[70px]` : ``
                      }    flex-row items-center  hover:bg-gray-100 rounded-lg`}
                    >
                      <div
                        className={`${
                          allCondition ? `mx-auto` : ``
                        } group-hover:scale-110 duration-300`}
                      >
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
                      <div className={`${allCondition ? `hidden` : `block`}`}>
                        <h1
                          className={`flex ml-4 text-[16px] ${
                            currentTab.profile ? `font-bold` : ``
                          }`}
                        >
                          Profile
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>

                {/** login and other menues */}
                <SideBarMenu
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  Search={Search}
                  not={not}
                  chat={chat}
                  forSide={forSide}
                  allCondition={allCondition}
                />
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
                  onClick={() => dispatch(closeModal())}
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
      {openModalState && <Modal />}
    </>
  );
};
export default SideBar;
