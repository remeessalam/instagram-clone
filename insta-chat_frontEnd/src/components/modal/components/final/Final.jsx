import { useEffect, useState } from "react";
import { svgIcons } from "../../../../utils/constant";
import { useSelector } from "react-redux";

const Final = ({ images, setImages }) => {
  const [count, setCount] = useState(0);
  const [discription, setDiscription] = useState("");
  const [disLength, setDisLength] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => setDisLength(discription.length), [discription]);
  const handleNextImage = () => {
    setCount((prevCount) =>
      prevCount < images.length - 1 ? prevCount + 1 : 0
    );
  };
  const handlePrevImage = () => {
    setCount((prevCount) =>
      prevCount > 0 ? prevCount - 1 : images.length - 1
    );
  };
  console.log(images, "thisisnewimage");
  return (
    <>
      <div className="relative w-[634px] h-[675px] bg-white text-white flex flex-wrap">
        {count !== 0 && (
          <div
            className="absolute left-3 bottom-1/2 z-500 cursor-pointer text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
            onClick={handlePrevImage}
          >
            {svgIcons.leftArrow}
          </div>
        )}
        {images?.map((img, i) => {
          return (
            <div
              className={`relative min-w-[634px] max-w-[634px] flex ${
                count === i ? `block` : `hidden`
              } `}
              key={img?.id}
            >
              <div
                className={` aspect-[${img?.aspectRatio}] mx-auto my-auto  `}
              >
                <img
                  src={img?.croppedImageUrl}
                  alt=""
                  style={{
                    filter: img?.filter?.filter,
                  }}
                  className={` aspect-[${img.aspectRatio}] max-h-postUploadImageMaxHeight object-cover `}
                />
              </div>
            </div>
          );
        })}
        {count < images.length - 1 && (
          <div
            className="absolute right-3 bottom-1/2 cursor-pointer z-500 text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
            onClick={handleNextImage}
          >
            {svgIcons.rightArrow}
          </div>
        )}
      </div>
      <div className="border-l w-full h-full ">
        <div className="px-4 h-16 flex items-center">
          {user?.user?.image ? (
            <div className="w-[28px] h-[28px] rounded-full mr-3">
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
          <h3 className="text-sm font-semibold">{user?.user?.username}</h3>
        </div>
        <div className="w-full px-4">
          <textarea
            className="w-full resize-none outline outline-0 h-40"
            name=""
            id=""
            onChange={(e) => {
              let value = e.target.value;
              console.log(e, "thisdfhaisdfadsjkf");
              if (value.length > 2200) {
                value = value.slice(0, 2200);
              }
              setDiscription(value);
            }}
            value={discription}
          ></textarea>
          <div className="w-full h-11 items-center flex justify-between">
            <div className="scale-150 w-6 h-6 flex items-center ml-[6px]">
              {svgIcons.imojiIcon}
            </div>
            <div className="flex text-xs w-16 text-end justify-end">
              {disLength}
              /2,200
            </div>
          </div>
        </div>
        <div className="border-y px-4">
          <div className="h-11 flex items-center justify-between">
            Add location
            <div>{svgIcons.locationIcon}</div>
          </div>
          <div className="h-11 flex items-center justify-between">
            <h1>Accessibility</h1>
            <div className="rotate-180">{svgIcons.downArrow}</div>
          </div>
          <div className="h-11 flex items-center justify-between">
            <h1>Advanced Settings</h1>
            <div className="rotate-180">{svgIcons.downArrow}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Final;
