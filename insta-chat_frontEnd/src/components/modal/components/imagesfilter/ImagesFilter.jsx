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

  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [fade, setFade] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [vignette, setVignette] = useState(0);

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

    // Apply existing filters if any
    if (imageFilter?.filter && imageFilter.filterName !== "Original") {
      filters = imageFilter.filter
        .split(/\s(?=[a-zA-Z-]+\()/) // Split on spaces before filter functions
        .map((part) => {
          const match = part.match(/([a-zA-Z-]+)\(([^)]+)\)/);
          if (!match) return part; // Return as-is if no match

          const [_, name, valueWithUnit] = match;
          const value = parseFloat(valueWithUnit);
          const unit = valueWithUnit.replace(/[\d.]/g, "") || "";

          if (name === "contrast") {
            // Scale from 1 to the filter value
            return `${name}(${
              1 + (value - 1) * (imageFilter.position / 100)
            }${unit})`;
          } else if (name === "saturate") {
            // Scale from 1 to the filter value
            return `${name}(${
              1 + (value - 1) * (imageFilter.position / 100)
            }${unit})`;
          } else if (name === "sepia") {
            // Scale directly
            return `${name}(${value * (imageFilter.position / 100)}${unit})`;
          } else if (name === "hue-rotate") {
            // Scale directly
            return `${name}(${value * (imageFilter.position / 100)}${unit})`;
          } else if (name === "brightness") {
            // Combine existing brightness value with the current brightness
            console.log(value, "alksdjflajsdfthisidvaluse");
            let by = brightness !== 0 ? (brightness > 0 ? 500 : 400) : 1;
            const currentBrightnessValue = 1 + brightness / by;
            const newBrightnessValue = value * currentBrightnessValue; // Combine with existing
            setBrightness(newBrightnessValue);
            return `${name}(${newBrightnessValue}${unit})`;
          } else {
            return part; // Return other filters as-is
          }
        })
        .join(" ");
    }

    // Apply brightness adjustment even if no other filter is selected
    // if (brightness !== 0) {
    //   let by = brightness > 0 ? 500 : 400;
    //   const brightnessValue = 1 + brightness / by; // Scale from -100 to 100 to 0 to 2
    //   filters += `brightness(${brightnessValue})`;
    //   console.log(filters, "thiaksdjfaksdfajdf");
    // }
    if (contrast !== 0) {
      let by = contrast > 0 ? 400 : 400;
      const contrastValue = 1 + contrast / by; // Scale from -100 to 100 to 0 to 2
      filters += `contrast(${contrastValue})`;
      console.log(filters, "thiaksdjfaksdfajdf");
    }
    // if (fade !== 0) {
    //   let by = fade > 0 ? 400 : 400;
    //   const fadeValue = 1 + fade / by; // Scale from -100 to 100 to 0 to 2
    //   filters += ` fade(${fadeValue})`;
    //   console.log(filters, "thiaksdjfaksdfajdf");
    // }
    if (saturation !== 0) {
      let by = saturation > 0 ? 400 : 100;
      const saturationValue = 1 + saturation / by; // Scale from -100 to 100 to 0 to 2
      filters += `saturate(${saturationValue})`;
    }
    console.log(filters, "thiaksdjfaksdfajdfonsdf");

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
              brightness={brightness}
              setBrightness={setBrightness}
              contrast={contrast}
              setContrast={setContrast}
              fade={fade}
              setFade={setFade}
              saturation={saturation}
              setSaturation={setSaturation}
              temperature={temperature}
              setTemperature={setTemperature}
              vignette={vignette}
              setVignette={setVignette}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FilterImage;
