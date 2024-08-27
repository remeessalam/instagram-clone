import { useState } from "react";
import { svgIcons } from "../../../utils/constant";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";

const CropImage = ({
  images,
  setOpen,
  open,
  imageCount,
  showCroppedImage,
  setImages,
  aspectRatio,
  setCrop,
  crop,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [position, setPosition] = useState(1);
  const [count, setCount] = useState(0);
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

  console.log(count, images, "akjshfkjashdfkjhadhfjkfdsj");

  console.log(
    images[count]?.url,
    count,
    //   position,
    "akjshfkjashdfkjhadhfjkfdsj",
    i++
  );
  const onCropComplete = async (croppedArea, croppedAreaPixel) => {
    if (
      isNaN(croppedAreaPixel?.width) ||
      isNaN(croppedArea?.x) ||
      imageCount !== images?.length
    ) {
      return;
    }
    console.log(
      imageCount,
      images,
      croppedAreaPixel,
      croppedArea,
      "akjshfkjashdfkjhadhfjkfdsjsingleone"
    );
    // setCroppedAreaPixels(croppedAreaPixel);
    if (count === images[count]?.id) {
      setImages((prev) => {
        console.log(prev[count]?.url, "Logging the URL");
        console.log(
          prev,
          croppedAreaPixel,
          "Logging previous images and cropped pixels"
        );
        const updatedImages = [...prev];
        updatedImages[count] = {
          ...updatedImages[count],
          croppedPixel: croppedAreaPixel,
        };
        return updatedImages;
      });
      console.log(images[count], "akjshfkjashdfkjhadhfjkfdsj");
    }
    let croppedImages;

    if (images[count]?.url) {
      croppedImages = await showCroppedImage(
        images[count],
        count,
        "from onCropComplete"
      );
      console.log(croppedImages, "akjshfkjashdfkjhadhfjkfdsjfour");
      console.log(croppedImages, "thiasdfkasdfasdfasdfkljcon");
    }

    if (croppedImages) {
      setImages((prev) => {
        const updatedImages = [...prev];
        updatedImages[count] = {
          ...updatedImages[count],
          croppedImageUrl: croppedImages,
          cropped: true,
        };
        return updatedImages;
      });
    }
  };

  // Handle previous image
  const handlePrev = () => {
    setCount((prevCount) =>
      prevCount > 0 ? prevCount - 1 : images.length - 1
    );
    setCrop({ x: 0, y: 0 });
  };

  // Handle next image
  const handleNext = () => {
    setCount((prevCount) =>
      prevCount < images.length - 1 ? prevCount + 1 : 0
    );

    setCrop({ x: 0, y: 0 });
  };
  const cropChange = (crop) => {
    console.log(crop, images[count]?.crop, "lkasdfkjasldcrop");
    setImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[count] = {
        ...updatedImages[count],
        crop: crop,
      };
      return updatedImages;
    });
    // setCrop(crop);
  };
  const onMediaLoad = (media) => {
    console.log(media, "akjsdkflkasjdflajdsflj");
  };
  console.log(images, "thisfidsfjacoropcropnosdfasfd");
  return (
    <div className=" flex h-postUploadChildContainer w-full flex-col rounded-md">
      <div className="flex  flex-col mx-auto md:w-full w-full h-[100%]">
        <div className="relative w-full h-full">
          <div
            onScroll={handleScroll}
            className={`flex  justify-center items-center overflow-x-auto w-[634px] h-[100%] transition-all duration-900  snap-x snap-mandatory scrollbar-hide`}
          >
            <div className={`w-full h-[100%] pb-[100%] overflow-hidden`}>
              {count !== 0 && (
                <div
                  className="absolute left-3 bottom-1/2 z-500 cursor-pointer text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
                  onClick={handlePrev}
                >
                  {svgIcons.leftArrow}
                </div>
              )}

              <Cropper
                image={images[count]?.url}
                crop={images[count]?.crop ? images[count]?.crop : crop}
                rotation={rotation}
                zoom={position}
                aspect={images[count]?.aspectRatio}
                onCropChange={cropChange}
                onMediaLoaded={onMediaLoad}
                onCropAreaChange={onCropComplete}
                cropShape="rect"
                // onZoomChange={setZoom}
              />

              {count < images.length - 1 && (
                <div
                  className="absolute right-3 bottom-1/2 cursor-pointer z-500 text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
                  onClick={handleNext}
                >
                  {svgIcons.rightArrow}
                </div>
              )}
            </div>
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
                    images[count]?.aspectRatio === 16 / 10
                      ? `text-white`
                      : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3 border-b`}
                  onClick={() => {
                    setImages((prev) => {
                      const updatedImages = [...prev];
                      updatedImages[count] = {
                        ...updatedImages[count],
                        aspectRatio: 16 / 10,
                      };
                      return updatedImages;
                    });
                  }}
                >
                  Original
                  {svgIcons.imageGallery}
                </div>
                <div
                  className={`text-center flex ${
                    images[count]?.aspectRatio === 1 / 1
                      ? `text-white`
                      : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3 border-b`}
                  onClick={() => {
                    setImages((prev) => {
                      const updatedImages = [...prev];
                      updatedImages[count] = {
                        ...updatedImages[count],
                        aspectRatio: 1 / 1,
                      };
                      return updatedImages;
                    });
                  }}
                >
                  1:1 {svgIcons.cropSquare}
                </div>
                <div
                  className={`text-center flex ${
                    images[count]?.aspectRatio === 4 / 5
                      ? `text-white`
                      : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3 border-b`}
                  onClick={() => {
                    setImages((prev) => {
                      const updatedImages = [...prev];
                      updatedImages[count] = {
                        ...updatedImages[count],
                        aspectRatio: 4 / 5,
                      };
                      return updatedImages;
                    });
                  }}
                >
                  4:5 {svgIcons.cropPortrait}
                </div>
                <div
                  className={`text-center flex ${
                    images[count]?.aspectRatio === 16 / 9
                      ? `text-white`
                      : `text-gray-500`
                  } items-center justify-center gap-3 cursor-pointer py-3`}
                  onClick={() => {
                    setImages((prev) => {
                      const updatedImages = [...prev];
                      updatedImages[count] = {
                        ...updatedImages[count],
                        aspectRatio: 16 / 9,
                      };
                      return updatedImages;
                    });
                  }}
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
