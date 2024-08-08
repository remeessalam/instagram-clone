import React from "react";

const SliderAll = ({ open, setOpen }) => {
  return (
    <div
      className={`absolute transition-all ease-in-out duration-200 overflow-hidden ${
        !open
          ? `w-[0px] left-[244px] border-0 z-50`
          : `w-[420px] left-[80px] z-50  border-r border-borderColor`
      }  h-screen `}
    >
      <div className="flex h-full flex-col relative  overflow-y-scroll bg-white py-6 shadow-xl">
        <div className=" px-4 sm:px-6">
          <div className=" text-2xl font-bold text-gray-900">chat</div>
        </div>
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          {/* Replace with your content */}
          <div className="absolute inset-0 px-4 sm:px-6">
            <div className="h-[90vh] bg-gray-500" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderAll;
