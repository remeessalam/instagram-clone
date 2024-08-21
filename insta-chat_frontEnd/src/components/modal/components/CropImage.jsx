import { useCallback, useState } from "react";
import { svgIcons } from "../../../utils/constant";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";

const CropImage = ({
  images,
  setOpen,
  open,
  croppedImage,
  setCroppedImage,
  setImageFile,
  setCroppedAreaPixels,
  croppedAreaPixels,
  showCroppedImage,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const [position, setPosition] = useState(1);
  //   const [croppedImage, setCroppedImage] = useState(null);
  const [count, setCount] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const duration = 5;
  const rotation = 0;
  const theme = useTheme();

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentSlide(newIndex);
  };
  let i = 0;
  console.log(aspectRatio, "thisiisascpredfd");

  console.log(images, "tisisiiisdfnaskdjiwe");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    if (count === images[count]?.id) {
      showCroppedImage(images);
      console.log(
        //   croppedArea,
        //   croppedAreaPixels,
        //   position,
        "akjshfkjashdfkjhadhfjkfdsj",
        i++
      );
    }
  }, []);

  // Handle previous image
  const handlePrev = () => {
    setCount((prevCount) =>
      prevCount > 0 ? prevCount - 1 : images.length - 1
    );
  };

  // Handle next image
  const handleNext = () => {
    setCount((prevCount) =>
      prevCount < images.length - 1 ? prevCount + 1 : 0
    );
  };

  return (
    <div className=" flex h-postUploadChildContainer w-full flex-col rounded-md">
      <div className="flex  flex-col mx-auto md:w-full w-full h-[100%]">
        <div className="relative w-full h-full">
          <div
            onScroll={handleScroll}
            className={`flex  justify-center items-center  overflow-x-auto w-[634px] h-[100%] transition-all duration-900  snap-x snap-mandatory scrollbar-hide`}
          >
            <div className={`w-full h-[100%] pb-[100%] overflow-hidden`}>
              {count !== 0 && (
                <div
                  className="absolute left-3 bottom-1/2 z-500 text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
                  onClick={handlePrev}
                >
                  {svgIcons.leftArrow}
                </div>
              )}
              <Cropper
                image={images[count]?.url}
                crop={crop}
                rotation={rotation}
                zoom={position}
                aspect={aspectRatio}
                onCropChange={setCrop}
                // onMediaLoaded={onCropComplete}
                onCropAreaChange={onCropComplete}
                cropShape="rect"
                // onZoomChange={setZoom}
              />
              {count < images.length - 1 && (
                <div
                  className="absolute right-3 bottom-1/2 z-500 text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
                  onClick={handleNext}
                >
                  {svgIcons.rightArrow}
                </div>
              )}
              {/* <img
                    className={` object-cover w-full h-full `}
                    src={img}
                    alt="post"
                  /> */}
            </div>
            {/* );
            })} */}
          </div>
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
          <div className="flex w-full flex-row justify-between  absolute bottom-4 px-4">
            <div className="flex gap-3">
              <div
                className="flex cursor-pointer justify-center text-white items-center h-8 w-8 rounded-full bg-black bg-opacity-60"
                onClick={() =>
                  setOpen((pre) => {
                    return pre === "crop" ? "" : "crop";
                  })
                }
              >
                {svgIcons.cropIcon}
              </div>
              <div
                className="flex cursor-pointer justify-center text-white items-center h-8 w-8 rounded-full bg-black bg-opacity-60"
                onClick={() =>
                  setOpen((pre) => {
                    return pre === "zoom" ? "" : "zoom";
                  })
                }
              >
                {svgIcons.zoomIcon}
              </div>
            </div>
            <div className="flex cursor-pointer justify-center text-white items-center h-8 w-8 rounded-full bg-black bg-opacity-60">
              {svgIcons.stackIcon}
            </div>
            {open === "crop" && (
              <div className="flex flex-col justify-between absolute bottom-10 w-32 h-48 bg-black bg-opacity-60  rounded-md">
                <div
                  className={`text-center flex ${
                    aspectRatio === 16 / 10 ? `text-white` : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3 border-b`}
                  onClick={() => setAspectRatio(16 / 10)}
                >
                  Original
                  {svgIcons.imageGallery}
                </div>
                <div
                  className={`text-center flex ${
                    aspectRatio === 1 / 1 ? `text-white` : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3 border-b`}
                  onClick={() => setAspectRatio(1 / 1)}
                >
                  1:1 {svgIcons.cropSquare}
                </div>
                <div
                  className={`text-center flex ${
                    aspectRatio === 4 / 5 ? `text-white` : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3 border-b`}
                  onClick={() => setAspectRatio(4 / 5)}
                >
                  4:5 {svgIcons.cropPortrait}
                </div>
                <div
                  className={`text-center flex ${
                    aspectRatio === 16 / 9 ? `text-white` : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3`}
                  onClick={() => setAspectRatio(16 / 9)}
                >
                  16:9 {svgIcons.cropLandscape}
                </div>
              </div>
            )}
            {open === "zoom" && (
              <div className="flex flex-col justify-center absolute bottom-10 w-40 h-8 bg-black bg-opacity-60  rounded-md px-3">
                <Slider
                  aria-label="time-indicator"
                  size="small"
                  value={position}
                  min={1}
                  step={0.001}
                  max={duration}
                  onChange={(_, value) => setPosition(value)}
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fff" : "#fff",
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropImage;
