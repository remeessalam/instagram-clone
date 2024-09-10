import React, { useEffect, useState } from "react";
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

  const [brightness, setBrightness] = useState(
    images.map((image, i) => {
      return { value: 0 };
    })
  );
  const [contrast, setContrast] = useState(
    images.map((image, i) => {
      return { value: 0 };
    })
  );
  const [saturation, setSaturation] = useState(
    images.map((image, i) => {
      return { value: 0 };
    })
  );

  console.log(brightness, "tlkasjdfkthisisibroghtness");
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
  console.log(images[count].filter, "thisisbrightness");

  const getDynamicFilter = () => {
    const imageFilter = images[count].filter;
    let filters = "";

    // If the filter is not applicable (position = 0 or filter is "Original"), return empty
    if (
      // !imageFilter ||
      imageFilter.position === 0 ||
      imageFilter.filterName === "Original"
    ) {
      return "";
    }

    // Apply filters based on position
    if (imageFilter?.filter && imageFilter.filterName !== "Original") {
      filters = imageFilter.filter
        .split(/\s(?=[a-zA-Z-]+\()/) // Split filter string into individual filters
        .map((part) => {
          const match = part.match(/([a-zA-Z-]+)\(([^)]+)\)/);
          if (!match) return part;

          const [_, name, valueWithUnit] = match;
          const value = parseFloat(valueWithUnit);
          const unit = valueWithUnit.replace(/[\d.]/g, "") || "";

          const positionFactor = imageFilter.position / 100; // Calculate the factor based on position (0 to 1)

          // Adjust filter values based on the slider position
          if (name === "contrast" && contrast[count]?.value !== 0) {
            const contrastValue =
              1 + (contrast[count]?.value / 400) * positionFactor;
            return `contrast(${contrastValue}${unit})`;
          } else if (name === "saturate" && saturation[count]?.value !== 0) {
            const saturationValue =
              1 +
              (saturation[count]?.value /
                (saturation[count]?.value > 0 ? 400 : 100)) *
                positionFactor;
            return `saturate(${saturationValue}${unit})`;
          } else if (name === "sepia" || name === "hue-rotate") {
            return `${name}(${value * positionFactor}${unit})`;
          } else if (name === "brightness" && brightness[count]?.value !== 0) {
            const brightnessValue =
              1 +
              (brightness[count]?.value /
                (brightness[count]?.value > 0 ? 500 : 400)) *
                positionFactor;
            return `brightness(${brightnessValue}${unit})`;
          } else {
            return part;
          }
        })
        .join(" ");
    }

    // Add missing filters if any
    if (!filters.includes("brightness") && brightness[count]?.value !== 0) {
      const brightnessValue =
        1 +
        (brightness[count]?.value /
          (brightness[count]?.value > 0 ? 500 : 400)) *
          (imageFilter.position / 100);
      filters = `${filters} brightness(${brightnessValue})`.trim();
    }

    if (!filters.includes("contrast") && contrast[count]?.value !== 0) {
      const contrastValue =
        1 + (contrast[count]?.value / 400) * (imageFilter.position / 100);
      filters = `${filters} contrast(${contrastValue})`.trim();
    }

    if (!filters.includes("saturate") && saturation[count]?.value !== 0) {
      const saturationValue =
        1 +
        (saturation[count]?.value /
          (saturation[count]?.value > 0 ? 400 : 100)) *
          (imageFilter.position / 100);
      filters = `${filters} saturate(${saturationValue})`.trim();
    }

    console.log(filters, "Updated filter string");

    return filters.trim(); // Return the final filter string
  };

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
              className={`relative min-w-[634px] max-w-[634px] flex ${
                count === i ? `block` : `hidden`
              } `}
              key={img?.id}
            >
              <div className={` aspect-[${img.aspectRatio}] mx-auto my-auto  `}>
                <img
                  src={img?.croppedImageUrl}
                  alt=""
                  style={{
                    filter: getDynamicFilter(),
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
            <Adjustments
              count={count}
              images={images}
              setImages={setImages}
              brightness={brightness}
              setBrightness={setBrightness}
              contrast={contrast}
              setContrast={setContrast}
              saturation={saturation}
              setSaturation={setSaturation}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FilterImage;
