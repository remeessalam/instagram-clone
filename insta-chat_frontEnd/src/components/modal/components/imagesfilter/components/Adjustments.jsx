import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const Adjustments = ({
  count,
  images,
  setImages,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  fade,
  setFade,
  saturation,
  setSaturation,
  temperature,
  setTemperature,
  vignette,
  setVignette,
}) => {
  const theme = useTheme();

  //   const [sliderValue, setSliderValue] = useState(0);
  console.log(brightness, "thisisbrightness");
  const [isSliding, setIsSliding] = useState(false);
  const duration = 100;

  //   function valuetext(value) {
  //     setFilterValue((prev) => {
  //       return {
  //         ...prev,
  //         brightness: value,
  //       };
  //     });
  //   }
  useEffect(() => {
    setBrightness((prev) => {
      const updatedBrightness = [...prev];
      if (!updatedBrightness[count]) {
        updatedBrightness[count] = { value: 0 };
      }
      return updatedBrightness;
    });
  }, [images, count]);
  console.log(brightness[count], count, "jsdfkjaksdjfkjadfk");
  return (
    <div>
      <div className="px-4">
        <div>
          <h3 className="py-3">Brightness</h3>
          <div className="flex gap-4 items-center">
            <Slider
              //   track={false}
              //   aria-labelledby="track-false-slider"
              // getAriaValueText={(value) =>
              //   setBrightness((prev) => {
              //     const updatedBrightness = [...prev]; // Create a shallow copy of the previous brightness array
              //     updatedBrightness[count] = value; // Update the specific index with the new value
              //     return updatedBrightness; // Return the updated array
              //   })
              // }
              onChange={(e, value) =>
                setBrightness((prev) => {
                  const updatedBrightness = [...prev]; // Create a shallow copy of the brightness array
                  updatedBrightness[count] = { value: value }; // Update the value at the specific index
                  return updatedBrightness; // Return the updated array
                })
              }
              min={-100}
              max={100}
              value={brightness[count]?.value || 0}
              onMouseDown={() => setIsSliding("brightness")}
              onMouseUp={() => setIsSliding(false)}
              sx={{
                color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                height: 2,
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
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
                    width: 22,
                    height: 22,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                "& .MuiSlider-track": {
                  left: `${
                    brightness[count]?.value >= 0
                      ? "50% !important"
                      : "auto !important"
                  }`,
                  right: `${
                    brightness[count]?.value <= 0
                      ? "50% !important"
                      : "auto !important"
                  }`,
                  width: `${
                    brightness[count]?.value >= 0
                      ? brightness[count].value / 2 + "% !important"
                      : Math.abs(brightness[count].value) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-7 ${
                isSliding === "brightness" ? "font-bold" : ""
              }`}
            >
              {brightness[count].value}
            </h3>
          </div>
        </div>
        <div>
          <h3 className="py-3">Contrast</h3>
          <div className="flex gap-4 items-center">
            <Slider
              //   track={false}
              //   aria-labelledby="track-false-slider"
              getAriaValueText={(value) => setContrast(value)}
              min={-100}
              max={100}
              defaultValue={contrast}
              onMouseDown={() => setIsSliding("contrast")}
              onMouseUp={() => setIsSliding(false)}
              sx={{
                color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                height: 2,
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
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
                    width: 22,
                    height: 22,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                "& .MuiSlider-track": {
                  left: `${
                    contrast >= 0 ? "50% !important" : "auto !important"
                  }`,
                  right: `${
                    contrast <= 0 ? "50% !important" : "auto !important"
                  }`,
                  width: `${
                    contrast >= 0
                      ? contrast / 2 + "% !important"
                      : Math.abs(contrast) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-7 ${
                isSliding === "contrast" ? "font-bold" : ""
              }`}
            >
              {contrast}
            </h3>
          </div>
        </div>
        <div>
          <h3 className="py-3">Fade</h3>
          <div className="flex gap-4 items-center">
            <Slider
              //   track={false}
              //   aria-labelledby="track-false-slider"
              getAriaValueText={(value) => setFade(value)}
              min={-100}
              max={100}
              defaultValue={fade}
              onMouseDown={() => setIsSliding("fade")}
              onMouseUp={() => setIsSliding(false)}
              sx={{
                color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                height: 2,
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
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
                    width: 22,
                    height: 22,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                "& .MuiSlider-track": {
                  left: `${fade >= 0 ? "50% !important" : "auto !important"}`,
                  right: `${fade <= 0 ? "50% !important" : "auto !important"}`,
                  width: `${
                    fade >= 0
                      ? fade / 2 + "% !important"
                      : Math.abs(fade) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-7 ${
                isSliding === "fade" ? "font-bold" : ""
              }`}
            >
              {fade}
            </h3>
          </div>
        </div>
        <div>
          <h3 className="py-3">Saturation</h3>
          <div className="flex gap-4 items-center">
            <Slider
              //   track={false}
              //   aria-labelledby="track-false-slider"
              getAriaValueText={(value) => setSaturation(value)}
              min={-100}
              max={100}
              defaultValue={saturation}
              onMouseDown={() => setIsSliding("saturation")}
              onMouseUp={() => setIsSliding(false)}
              sx={{
                color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                height: 2,
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
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
                    width: 22,
                    height: 22,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                "& .MuiSlider-track": {
                  left: `${
                    saturation >= 0 ? "50% !important" : "auto !important"
                  }`,
                  right: `${
                    saturation <= 0 ? "50% !important" : "auto !important"
                  }`,
                  width: `${
                    saturation >= 0
                      ? saturation / 2 + "% !important"
                      : Math.abs(saturation) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-7 ${
                isSliding === "saturation" ? "font-bold" : ""
              }`}
            >
              {saturation}
            </h3>
          </div>
        </div>
        <div>
          <h3 className="py-3">Temperature</h3>
          <div className="flex gap-4 items-center">
            <Slider
              //   track={false}
              //   aria-labelledby="track-false-slider"
              getAriaValueText={(value) => setTemperature(value)}
              min={-100}
              max={100}
              defaultValue={0}
              onMouseDown={() => setIsSliding("temperature")}
              onMouseUp={() => setIsSliding(false)}
              sx={{
                color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                height: 2,
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
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
                    width: 22,
                    height: 22,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                "& .MuiSlider-track": {
                  left: `${
                    temperature >= 0 ? "50% !important" : "auto !important"
                  }`,
                  right: `${
                    temperature <= 0 ? "50% !important" : "auto !important"
                  }`,
                  width: `${
                    temperature >= 0
                      ? temperature / 2 + "% !important"
                      : Math.abs(temperature) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-7 ${
                isSliding === "temperature" ? "font-bold" : ""
              }`}
            >
              {temperature}
            </h3>
          </div>
        </div>
        <div>
          <h3 className="py-3">Vignette</h3>
          <div className="flex gap-4 items-center">
            <Slider
              aria-label="time-indicator"
              size="small"
              value={vignette}
              min={0}
              step={0.001}
              max={duration}
              onChange={(_, value) => {
                setVignette(value);
              }}
              onMouseDown={() => setIsSliding("vignette")}
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
            <h3
              className={`text-xs w-7 ${
                isSliding === "vignette" ? "font-bold" : ""
              }`}
            >
              {Math.floor(vignette)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adjustments;
