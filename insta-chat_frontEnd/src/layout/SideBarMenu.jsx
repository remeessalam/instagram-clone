import React, { useRef, useState } from "react";
import useChangeTab from "../hooks/useChangeTab";
import { useNavigate } from "react-router-dom";

const SideBarMenu = ({
  currentTab,
  setCurrentTab,
  Search,
  not,
  chat,
  allCondition,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleTabClick = useChangeTab();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className="z-100">
      <div className="flex w-full h-40 pt-16">
        <div
          className="flex flex-row items-center px-3 group"
          // onClick={handleMenuToggle}
        >
          <div
            className="flex"
            onClick={() => {
              handleMenuToggle();
              handleTabClick("more", setCurrentTab);
            }}
          >
            <div className="flex  w-10 cursor-pointer group-hover:scale-110 duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 24"
                strokeWidth={currentTab.more ? 2.5 : 1.5}
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
            <div className="w-full  ml-3">
              {allCondition ? (
                ""
              ) : (
                <button
                  className={`flex text-[16px] items-center min-w-full h-full ${
                    currentTab.more ? `font-bold ` : ` `
                  } `}
                >
                  More
                </button>
              )}
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
                        <button className="w-full text-start">Saved</button>
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
                      <button className="w-full text-start" onClick={logout}>
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
      </div>
    </div>
  );
};

export default SideBarMenu;
