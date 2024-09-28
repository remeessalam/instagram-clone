import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const Adjustments = ({
  count,
  images,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
}) => {
  const theme = useTheme();

  const [isSliding, setIsSliding] = useState(false);
  const [fade, setFade] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [vignette, setVignette] = useState(0);
  const duration = 100;

  useEffect(() => {
    setBrightness((prev) => {
      const updatedBrightness = [...prev];
      if (!updatedBrightness[count]) {
        updatedBrightness[count] = { value: 0 };
      }
      return updatedBrightness;
    });
    // eslint-disable-next-line
  }, [images, count]);

  const resetFilter = (fun) => {
    fun((prev) => {
      const updatedBrightness = [...prev];
      if (updatedBrightness[count]) {
        updatedBrightness[count] = { value: 0 };
      }
      return updatedBrightness;
    });
  };
  return (
    <div>
      <div className="px-5">
        <div className="group">
          <div className="flex justify-between">
            <h3 className="py-3 ">Brightness</h3>
            {brightness[count].value !== 0 && (
              <h3
                onClick={() => resetFilter(setBrightness)}
                className="py-3 font-semibold text-sm group-hover:block hidden text-sky-500"
              >
                Reset
              </h3>
            )}
          </div>
          <div className="flex gap-6 items-center">
            <Slider
              onChange={(_, value) =>
                setBrightness((prev) => {
                  const updatedBrightness = [...prev];
                  updatedBrightness[count] = { value: value };
                  return updatedBrightness;
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
              className={`text-xs w-10 ${
                isSliding === "brightness" ? "font-bold" : ""
              }`}
            >
              {brightness[count].value}
            </h3>
          </div>
        </div>
        <div className="group">
          <div className="flex justify-between">
            <h3 className="py-3">Contrast</h3>
            {contrast[count].value !== 0 && (
              <h3
                onClick={() => resetFilter(setContrast)}
                className="py-3 font-semibold text-sm group-hover:block hidden text-sky-500"
              >
                Reset
              </h3>
            )}
          </div>
          <div className="flex gap-6 items-center">
            <Slider
              onChange={(_, value) =>
                setContrast((prev) => {
                  const updatedBrightness = [...prev];
                  updatedBrightness[count] = { value: value };
                  return updatedBrightness;
                })
              }
              min={-100}
              max={100}
              value={contrast[count]?.value}
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
                    contrast[count]?.value >= 0
                      ? "50% !important"
                      : "auto !important"
                  }`,
                  right: `${
                    contrast[count]?.value <= 0
                      ? "50% !important"
                      : "auto !important"
                  }`,
                  width: `${
                    contrast[count]?.value >= 0
                      ? contrast[count]?.value / 2 + "% !important"
                      : Math.abs(contrast[count]?.value) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-10 ${
                isSliding === "contrast" ? "font-bold" : ""
              }`}
            >
              {contrast[count]?.value}
            </h3>
          </div>
        </div>
        <div className="group">
          <div className="flex justify-between">
            <h3 className="py-3">Fade</h3>
            <h3 className="py-3 hidden group-hover:block font-semibold text-sm text-sky-500">
              Not working
            </h3>
          </div>
          <div className="flex gap-6 items-center">
            <Slider
              onChange={(_, value) => setFade(value)}
              min={-100}
              max={100}
              value={fade}
              onMouseDown={() => setIsSliding("fade")}
              onMouseUp={() => setIsSliding(false)}
              sx={{
                color: theme.palette.mode === "dark" ? "#000000" : "#000000",
                height: 2,
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&::before": {},
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
              className={`text-xs w-10 ${
                isSliding === "fade" ? "font-bold" : ""
              }`}
            >
              {fade}
            </h3>
          </div>
        </div>
        <div className="group">
          <div className="flex justify-between">
            <h3 className="py-3">Saturation</h3>
            {saturation[count].value !== 0 && (
              <h3
                onClick={() => resetFilter(setSaturation)}
                className="py-3 font-semibold text-sm group-hover:block hidden text-sky-500"
              >
                Reset
              </h3>
            )}
          </div>
          <div className="flex gap-6 items-center">
            <Slider
              onChange={(_, value) =>
                setSaturation((prev) => {
                  const updatedBrightness = [...prev];
                  updatedBrightness[count] = { value: value };
                  return updatedBrightness;
                })
              }
              min={-100}
              max={100}
              value={saturation[count]?.value || 0}
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
                    saturation[count]?.value >= 0
                      ? "50% !important"
                      : "auto !important"
                  }`,
                  right: `${
                    saturation[count]?.value <= 0
                      ? "50% !important"
                      : "auto !important"
                  }`,
                  width: `${
                    saturation[count]?.value >= 0
                      ? saturation[count]?.value / 2 + "% !important"
                      : Math.abs(saturation[count]?.value) / 2 + "% !important"
                  }`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3
              className={`text-xs w-10 ${
                isSliding === "saturation" ? "font-bold" : ""
              }`}
            >
              {saturation[count]?.value}
            </h3>
          </div>
        </div>
        <div className="group">
          <div className="flex justify-between">
            <h3 className="py-3">Temperature</h3>
            <h3 className="py-3 font-semibold text-sm text-sky-500 hidden group-hover:block">
              Not working
            </h3>
          </div>
          <div className="flex gap-6 items-center">
            <Slider
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
              className={`text-xs w-10 ${
                isSliding === "temperature" ? "font-bold" : ""
              }`}
            >
              {temperature}
            </h3>
          </div>
        </div>
        <div className="group">
          <div className="flex justify-between">
            <h3 className="py-3">Vignette</h3>
            <h3 className="py-3 font-semibold text-sm text-sky-500 hidden group-hover:block">
              Not working
            </h3>
          </div>
          <div className="flex gap-6 items-center">
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
              className={`text-xs w-10 ${
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
