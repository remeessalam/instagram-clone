import React, { useState } from "react";
import { svgIcons } from "../../../utils/constant";
import Aden from "../../../filterSamples/Aden-2x.jpg";
import Clarendon from "../../../filterSamples/Clarendon-2x.jpg";
import Crema from "../../../filterSamples/Crema-2x.jpg";
import Gingham from "../../../filterSamples/Gingham-2x.jpg";
const FilterImage = ({ images }) => {
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState("filter");
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
  const filters = [
    {
      filterName: "Aden",
      filterSample: Aden,
    },
    {
      filterName: "Clarendon",
      filterSample: Clarendon,
    },
    {
      filterName: "Crema",
      filterSample: Crema,
    },
    {
      filterName: "Gingham",
      filterSample: Gingham,
    },
    {
      filterName: "Juno",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Juno-2x.jpg?__d=www",
    },
    {
      filterName: "Lark",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Lark-2x.jpg?__d=www",
    },
    {
      filterName: "Ludwig",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Ludwig-2x.jpg?__d=www",
    },
    {
      filterName: "Moon",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Moon-2x.jpg?__d=www",
    },
    {
      filterName: "Orginal",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Normal-2x.jpg?__d=www",
    },
    {
      filterName: "Perpetua",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Perpetua-2x.jpg?__d=www",
    },
    {
      filterName: "Reyes",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Reyes-2x.jpg?__d=www",
    },
    {
      filterName: "Slumber",
      filterSample:
        "https://www.instagram.com/images/instagram/xig/filters/Slumber-2x.jpg?__d=www",
    },
  ];
  return (
    <>
      <div
        className={`flex select-none relative min-w-[634px] h-full overflow-scroll transition-all duration-900 overflow-x-auto snap-x snap-mandatory scrollbar-hide`}
      >
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
              className={`min-w-[634px] max-w-[634px] flex ${
                count === i ? `block` : `hidden`
              } `}
              key={img?.id}
            >
              <div className={`aspect-[${img.aspectRatio}] mx-auto my-auto  `}>
                <img
                  src={img?.croppedImageUrl}
                  alt=""
                  className={`aspect-[${img.aspectRatio}] max-h-postUploadImageMaxHeight object-cover `}
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
        {images.length > 1 && (
          <div className="flex  justify-center absolute gap-1 bottom-8 w-full text-center">
            {images.map((_, index) => {
              return (
                <div
                  key={index}
                  className={`w-[6px] h-[6px] rounded-full  ${
                    index === count ? "bg-white" : "bg-imageDotColor"
                  }`}
                ></div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-postUploadImageFilterArea h-full">
        <div className="w-full  flex justify-between">
          <div
            className={`border-b text-sm font-semibold transition-colors duration-300 ${
              tab === "filter"
                ? `text-blue-900 border-gray-600`
                : `text-gray-300 border-gray-400`
            } text-center py-3 w-full`}
            onClick={() => setTab("filter")}
          >
            Filters
          </div>
          <div
            className={`border-b text-sm font-semibold transition-colors duration-300 ${
              tab === "adjustments"
                ? `text-blue-900 border-gray-600`
                : `text-gray-300 border-gray-400`
            } text-center py-3 w-full`}
            onClick={() => setTab("adjustments")}
          >
            Adjustments
          </div>
        </div>
        <div>
          {tab === "filter" ? (
            <div className="grid grid-cols-3 gap-4">
              {filters.map((filter) => {
                return (
                  <div
                    key={filter.filterName}
                    className="flex items-center flex-col h-[111px]"
                  >
                    <img src={filter.filterSample} alt={filter.filterName} />
                    <h3> {filter.filterName}</h3>
                  </div>
                );
              })}
            </div>
          ) : (
            <div> adjustment area</div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterImage;
