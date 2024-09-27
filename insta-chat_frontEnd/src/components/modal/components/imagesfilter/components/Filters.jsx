import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Slider } from "@mui/material";

const Filters = ({
  filterSelection,
  setImages,
  count,
  setSelectedFilter,
  images,
  selectedFilter,
  setFilterSelection,
}) => {
  const [isSliding, setIsSliding] = useState(false);
  const duration = 100;
  const theme = useTheme();
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mx-4 mt-4">
        {filterSelection.map((filter) => {
          return (
            <div
              key={filter.filterName}
              onClick={() => {
                setImages((prev) => {
                  const newImages = [...prev];
                  newImages[count] = {
                    ...newImages[count],
                    filter: filter,
                  };
                  return newImages;
                });
                setSelectedFilter({
                  filter,
                });
              }}
              className={`flex items-center gap-2 flex-col h-[111px] `}
            >
              <img
                className={`rounded-sm border-2 border-transparent ${
                  images[count].filter.filterName === filter.filterName
                    ? `  border-sky-500`
                    : ``
                }`}
                src={filter.filterSample}
                alt={filter.filterName}
              />
              <h3
                className={`text-xs ${
                  images[count].filter.filterName === filter.filterName
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
      <div className="flex  gap-5 text-xs focus:font-medium active-within:font-bold items-center mt-8 mx-4">
        {filterSelection.map((filter, index) => {
          return (
            <div
              key={filter.filterName}
              className={`w-full flex items-center ${
                selectedFilter.filter.filterName === filter.filterName &&
                selectedFilter.filter.filterName !== "Orginal"
                  ? `block`
                  : `hidden`
              }`}
            >
              <Slider
                aria-label="time-indicator"
                size="small"
                value={filter?.position}
                min={0}
                step={0.001}
                max={duration}
                onChange={(_, value) => {
                  setFilterSelection((prev) => {
                    const updatedSelection = prev.map((item, idx) => {
                      if (idx === index) {
                        return {
                          ...item,
                          position: value,
                        };
                      }
                      return item;
                    });
                    return updatedSelection;
                  });

                  setImages((prev) => {
                    const newImages = [...prev];
                    newImages[count] = {
                      ...newImages[count],
                      filter: {
                        ...prev[count].filter,
                        position: value,
                      },
                    };
                    return newImages;
                  });
                  setSelectedFilter((prev) => {
                    if (
                      selectedFilter.filter.filterName === filter.filterName
                    ) {
                      return {
                        ...selectedFilter,
                        filter: {
                          ...selectedFilter.filter,
                          position: value,
                        },
                      };
                    }
                    return prev;
                  });
                }}
                onMouseDown={() => setIsSliding(true)}
                onMouseUp={() => setIsSliding(false)}
                sx={{
                  color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                  height: 2,
                  "& .MuiSlider-thumb": {
                    width: 19,
                    height: 19,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&::before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px ${
                        theme.palette.mode === "dark"
                          ? "rgb(255 255 255 / 16%)"
                          : "rgb(0 0 0 / 16%)"
                      }`,
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
            </div>
          );
        })}
        <h1 className={`w-6 text-end ${isSliding ? "font-bold" : ""}`}>
          {selectedFilter?.filter?.position &&
            Math.floor(selectedFilter?.filter?.position)}
        </h1>
      </div>
    </>
  );
};

export default Filters;
