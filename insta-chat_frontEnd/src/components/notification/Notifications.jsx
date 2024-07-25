import React, { useEffect, useState } from "react";
import notification from "../../services/getnotification";
import Time from "../showposttime/AddedTime";

const NotificationC = ({ open, setOpen }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notification().then((data) => {
      setNotifications(data.data.data);
      console.log(
        notifications,
        "jsx notification================================================================"
      );
    });
  }, [open]);
  return (
    <>
      <div
        className={`absolute transition-all ease-in-out duration-200 overflow-hidden ${
          !open ? `w-[0px] left-[244px] ` : `w-[420px] left-[80px] `
        }  h-screen rounded-r-2xl border-r border-borderColor`}
      >
        <div className="flex h-full flex-col relative  overflow-y-scroll bg-white py-6 shadow-xl">
          <div className=" px-4 sm:px-6">
            <div className=" text-2xl font-bold text-gray-900">
              Notifications
            </div>
          </div>
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            {/* Replace with your content */}
            <div className="absolute inset-0 px-4 sm:px-6">
              <div className="h-full " aria-hidden="true">
                <div>
                  <div className="flex flex-row justify-start   border-gray-200 p-1 w-full">
                    <div className="w-full overflow-y-auto overflow-hidden scrollbar-hide">
                      {notifications?.posts?.map((obj, i) => {
                        return (
                          <div
                            key={i}
                            className="flex justify-start items-center w-full mb-2"
                          >
                            {obj.posteduser?.image ? (
                              <img
                                className=" w-11 h-11 object-cover rounded-full"
                                src={obj.posteduser?.image}
                                alt="sorry"
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-14 h-14"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <h1 className="mr-2 text-xs">
                              {obj.posteduser?.name}
                            </h1>
                            <h1 className="text-xs">
                              add new photo.
                              <Time time={obj.time} />
                              ago
                            </h1>
                            <img
                              className="ml-2  w-11 h-11 object-cover"
                              src={obj.post?.image[0]?.url}
                              alt=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationC;
