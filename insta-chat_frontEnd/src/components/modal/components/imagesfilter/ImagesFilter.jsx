import React, { useState } from "react";
import { svgIcons } from "../../../../utils/constant";
import { filtersImagesFilters } from "../../../../utils/constant";
import "./filter.css";
import Filters from "./components/Filters";
import Adjustments from "./components/Adjustments";
const FilterImage = ({ images, setImages }) => {
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState("filter");

  const [filterSelection, setFilterSelection] = useState(filtersImagesFilters);
  const [selectedFilter, setSelectedFilter] = useState({
    filterName: "Orginal",
    filter: "",
  });

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
  console.log(selectedFilter, "asdjflkajdsflfioer");
  const getDynamicFilter = () => {
    if (
      images[count].filter.position === 0 ||
      !images[count].filter.filter ||
      images[count].filter.filterName === "Orginal"
    )
      return ""; // No filter at position 0 or if no filter is selected
    console.log(images[count], "fffasdfasdfasdfasdf");
    return images[count]?.filter?.filter
      .split(/\s(?=[a-zA-Z-]+\()/) // Split on spaces before filter functions
      .map((part) => {
        const match = part.match(/([a-zA-Z-]+)\(([^)]+)\)/);
        if (!match) return part; // Return as-is if no match

        const [_, name, valueWithUnit] = match;
        const value = parseFloat(valueWithUnit);
        const unit = valueWithUnit.replace(/[\d.]/g, "") || "";

        switch (name) {
          case "brightness":
          case "contrast":
          case "saturate":
            // For these filters, we scale from 1 to the filter value
            return `${name}(${
              1 + (value - 1) * (images[count].filter.position / 100)
            }${unit})`;
          case "sepia":
            // Sepia is scaled directly
            return `${name}(${
              value * (images[count].filter.position / 100)
            }${unit})`;
          case "hue-rotate":
            // Hue-rotate is scaled directly
            return `${name}(${
              value * (images[count].filter.position / 100)
            }${unit})`;
          default:
            // For any other filter, return as-is
            return part;
        }
      })
      .join(" ");
  };
  console.log(getDynamicFilter(), "ajdflkasjflkajslfkjaslkfjl");
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
                  style={{ filter: getDynamicFilter() }}
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
            <Filters
              filterSelection={filterSelection}
              setImages={setImages}
              count={count}
              setSelectedFilter={setSelectedFilter}
              images={images}
              selectedFilter={selectedFilter}
              setFilterSelection={setFilterSelection}
            />
          ) : (
            <Adjustments />
          )}
        </div>
      </div>
    </>
  );
};

export default FilterImage;
