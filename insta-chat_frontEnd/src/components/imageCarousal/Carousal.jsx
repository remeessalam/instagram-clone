import { useState } from "react";
import "./carousal.css";
const Carousal = ({ image, fun = null, id = null, type }) => {
  const [currentSlide, setCurrentSlide] = useState();
  const images = image;
  console.log(image, "thisisimagessss");
  //   const e = image;
  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentSlide(newIndex);
  };
  console.log(type, "typeofthecarousal");
  return (
    <div
      className={`carousalcondainer rounded-lg z-0  overflow-hidden bg-black min-h-[468px]  max-h-[585px] 
        ${type === "post" ? `block` : `block`}
      }`}
    >
      <div
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-black"
        onDoubleClick={() => {
          fun(id);
        }}
        fun
        onScroll={handleScroll}

        // onClick={() => {
        //     setOpen(!open)
        // }}
      >
        {images.map((obj, i) => {
          return (
            <div key={i} className="flex min-w-full snap-always snap-center ">
              <img
                className="min-h-[468px] w-full max-h-[585px] object-cover "
                src={obj.url ? obj.url : obj}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div
        className={`childDot flex  justify-center -z-0  bg-green-300  gap-1  w-full text-center`}
      >
        {images.map((image, index) => {
          console.log(index, "thisisindex");
          return (
            <>
              {images.length > 1 && (
                <div
                  key={index}
                  className={`w-[6px] h-[6px] rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-imageDotColor"
                  }`}
                ></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Carousal;
