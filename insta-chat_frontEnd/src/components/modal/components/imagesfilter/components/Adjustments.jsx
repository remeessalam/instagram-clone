import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

const Adjustments = () => {
  const theme = useTheme();

  const [sliderValue, setSliderValue] = useState(0);
  function valuetext(value) {
    setSliderValue(value);
  }
  return (
    <div>
      <div className="px-4">
        <div>
          <h3>Brightness</h3>
          <div>
            <Slider
              //   track={false}
              //   aria-labelledby="track-false-slider"
              getAriaValueText={valuetext}
              min={-100}
              max={100}
              defaultValue={0}
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
                "& .MuiSlider-track": {
                  left: `${sliderValue <= 0 ? "50%" : "auto"}`,
                  right: `${sliderValue >= 0 ? "50%" : "auto"}`,
                  width: `${sliderValue >= 0 ? "0%" : "auto"}`,
                  transition: "left 0.3s, right 0.3s",
                },
              }}
            />
            <h3>{sliderValue}</h3>
          </div>
        </div>
        <div>
          <h3>Contrast</h3>
        </div>
        <div>
          <h3>Fade</h3>
        </div>
        <div>
          <h3>Saturation</h3>
        </div>
        <div>
          <h3>Temperature</h3>
        </div>
        <div>
          <h3>Vignette</h3>
        </div>
      </div>
    </div>
  );
};

export default Adjustments;
