import React, { useState } from "react";
import { svgIcons } from "../../../utils/constant";
import Aden from "../../../filterSamples/Aden-2x.jpg";
import Clarendon from "../../../filterSamples/Clarendon-2x.jpg";
import Crema from "../../../filterSamples/Crema-2x.jpg";
import Gingham from "../../../filterSamples/Gingham-2x.jpg";
import Juno from "../../../filterSamples/Juno-2x.jpg";
import Lark from "../../../filterSamples/Lark-2x.jpg";
import Ludwig from "../../../filterSamples/Ludwig-2x.jpg";
import Moon from "../../../filterSamples/Moon-2x.jpg";
import Normal from "../../../filterSamples/Normal-2x.jpg";
import Perpetua from "../../../filterSamples/Perpetua-2x.jpg";
import Reyes from "../../../filterSamples/Reyes-2x.jpg";
import Slumber from "../../../filterSamples/Slumber-2x.jpg";
import "./filter.css";
const FilterImage = ({ images, setImages }) => {
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState("filter");
  const [filterSelection, setFilterSelection] = useState("Orginal");
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
      class: "aden",
      filter: "sepia(0.2) brightness(1.15) saturate(1.4)",
    },
    {
      filterName: "Clarendon",
      filterSample: Clarendon,
      filter: "sepia(0.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)",
    },
    {
      filterName: "Crema",
      filterSample: Crema,
      filter:
        "sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9) hue-rotate(-2deg)",
    },
    {
      filterName: "Gingham",
      filterSample: Gingham,
      filter: "contrast(1.1) brightness(1.1)",
    },
    {
      filterName: "Juno",
      filterSample: Juno,
      filter: "sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8)",
    },
    {
      filterName: "Lark",
      filterSample: Lark,
      filter: "sepia(0.25) contrast(1.2) brightness(1.3) saturate(1.25)",
    },
    {
      filterName: "Ludwig",
      filterSample: Ludwig,
      filter: "sepia(0.25) contrast(1.05) brightness(1.05) saturate(2)",
    },
    {
      filterName: "Moon",
      filterSample: Moon,
      filter: "brightness(1.4) contrast(0.95) saturate(0) sepia(0.35)",
    },
    {
      filterName: "Orginal",
      filterSample: Normal,
    },
    {
      filterName: "Perpetua",
      filterSample: Perpetua,
      filter: "contrast(1.1) brightness(1.25) saturate(1.1)",
    },
    {
      filterName: "Reyes",
      filterSample: Reyes,
      filter: "sepia(0.75) contrast(0.75) brightness(1.25) saturate(1.4)",
    },
    {
      filterName: "Slumber",
      filterSample: Slumber,
      filter: "sepia(0.35) contrast(1.25) saturate(1.25)",
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
                  className={`filter-${filterSelection.toLowerCase()} aspect-[${
                    img.aspectRatio
                  }] max-h-postUploadImageMaxHeight object-cover `}
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
            <div className="grid grid-cols-3 gap-4 mx-4 mt-4">
              {filters.map((filter) => {
                return (
                  <div
                    key={filter.filterName}
                    onClick={() => setFilterSelection(filter.filterName)}
                    className={`flex items-center gap-2 flex-col h-[111px] `}
                  >
                    <img
                      className={`rounded-sm border-2 border-transparent ${
                        filterSelection === filter.filterName
                          ? `  border-sky-500`
                          : ``
                      }`}
                      src={filter.filterSample}
                      alt={filter.filterName}
                    />
                    <h3
                      className={`text-xs ${
                        filterSelection === filter.filterName
                          ? `text-sky-500 font-semibold`
                          : `text-gray-500`
                      } `}
                    >
                      {" "}
                      {filter.filterName}
                    </h3>
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
