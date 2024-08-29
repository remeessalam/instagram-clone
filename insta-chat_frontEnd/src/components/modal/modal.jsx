import { useState, useEffect } from "react";
import uploadImage from "../../services/imageUpload";
import InsertPost from "../../services/uploadPost";
import { svgIcons } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../reduxgobalState/slices/modalslice";
import CropImage from "./components/CropImage";
import getCroppedImg from "../../utils/helperFuntion";
import FilterImage from "./components/FilterImages";

export default function Modal() {
  const [spinner, setSpinner] = useState(false);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState();
  const [open, setOpen] = useState("");
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [imageCount, setImageCount] = useState(0);
  const [next, setNext] = useState(false);

  const openModalState = useSelector((state) => state.modal.openModalState);
  const dispatch = useDispatch();

  useEffect(() => {
    let counts = 0;
    images.forEach((img) => {
      if (img.croppedImageUrl) {
        counts++;
        if (images.length === counts) {
          setNext(true);
        }
      }
    });
  });

  const uploadPhoto = (e) => {
    const files = Object.values(e.target.files);
    setImageCount(files.length);
    setImageFile(files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((prev) => [
          ...(prev || []),
          {
            url: readerEvent.target.result,
            id: prev.length,
            cropped: false,
            croppedPixel: {},
            croppedImageUrl: null,
            aspectRatio: 1 / 1,
            crop: { x: 0, y: 0 },
            filter: {
              filterName: "Orginal",
              filterSample: "",
              filter: "",
              position: 100,
            },
          },
        ]);
      };
    });
    setStep(1);
  };

  const addImage = () => {
    setSpinner(true);
    uploadImage(imageFile)
      .then((data) => {
        if (data) {
          InsertPost(data, caption);
          dispatch(openModal());
          setImages([]);
        }
        setSpinner(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleNext = () => {
    setSpinner(true);

    setStep((pre) => pre + 1);

    setSpinner(false);
  };

  const handlePrev = () => {
    setStep((prev) => {
      prev === 1 && setImages([]);
      return prev === 0 ? 0 : prev - 1;
    });
  };

  const showCroppedImage = async (image, count) => {
    try {
      const croppedImages = await getCroppedImg(
        image?.url,
        image?.croppedPixel
      );

      if (croppedImages) {
        return croppedImages;
      }
    } catch (e) {
      throw Error(e, "somthing worst happening");
    }
  };
  // const handleNextImage = () => {
  //   setCount((prevCount) =>
  //     prevCount < images.length - 1 ? prevCount + 1 : 0
  //   );
  //   setCrop({ x: 0, y: 0 });
  // };
  // const handlePrevImage = () => {
  //   setCount((prevCount) =>
  //     prevCount > 0 ? prevCount - 1 : images.length - 1
  //   );
  //   setCrop({ x: 0, y: 0 });
  // };

  return (
    <>
      {openModalState && (
        <div className="fixed inset-0 w-full h-[100vh] !z-100 overflow-y-auto bg-black bg-opacity-60">
          {/** CLOSE BUTTON */}
          <div className="fixed right-2 top-2 sm:p-1 p-6">
            <button
              type="button"
              className="inline-flex p-1 text-base font-medium text-white"
              onClick={() => {
                setImages([]);
                dispatch(closeModal());
              }}
            >
              {svgIcons.whiteXCloseIcon}
            </button>
          </div>
          {/**POST MODEL */}
          <div className=" z-500 flex min-h-full justify-center w-full items-center">
            {/** CONTAINER */}
            <div
              className={`bg-white  rounded-xl overflow-hidden ${
                step > 1 ? `md:w-[978px]` : `md:w-[634px]`
              } w-[290px] h-[675px]`}
            >
              <div className="flex items-center py-5 px-2 justify-between w-full h-8 border-b border-borderColor">
                <span
                  onClick={handlePrev}
                  className={`${
                    step === 0 ? `invisible` : `visible`
                  } cursor-pointer`}
                >
                  {svgIcons.leftArrow}
                </span>
                <h3 className="font-semibold">
                  {spinner ? "`loading" : "Create new post"}
                </h3>
                {next ? (
                  <h3
                    className="cursor-pointer font-semibold text-sm text-sky-500 hover:text-blue-900"
                    onClick={handleNext}
                  >
                    Next
                  </h3>
                ) : (
                  <div
                    className={`relative group ${
                      step === 0 ? `invisible` : `visible`
                    }`}
                  >
                    <h3 className="text-gray-200 cursor-pointer font-semibold text-sm">
                      Next
                    </h3>
                    <div className="absolute -translate-x-3/4 mt-2 w-max bg-black text-white text-xs px-2 py-1  opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      Crop All Images
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:flex sm:items-center w-full h-postUploadChildContainer overflow-hidden">
                {/** STEP ONE */}
                {step === 0 && (
                  <div className="mt-3  flex items-center justify-center text-center w-full h-full">
                    <div className="max-h-full p-4 flex flex-col m-2">
                      <div className="">
                        <div className="flex justify-center">
                          {svgIcons.postUploadModal}
                        </div>
                        <h1 className="text-xl my-4">Drag your photos here</h1>
                      </div>
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer py-2 px-3 rounded-md bg-sky-600 font-medium text-white hover:pointer"
                        >
                          <span>Select from computer</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={uploadPhoto}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <CropImage
                    images={images}
                    open={open}
                    setOpen={setOpen}
                    showCroppedImage={showCroppedImage}
                    setImages={setImages}
                    setCrop={setCrop}
                    crop={crop}
                    imageCount={imageCount}
                  />
                )}
                {step === 2 && (
                  <FilterImage images={images} setImages={setImages} />
                  // <div
                  //   className={`flex select-none relative min-w-[634px] h-full overflow-scroll transition-all duration-900 overflow-x-auto snap-x snap-mandatory scrollbar-hide`}
                  // >
                  //   {count !== 0 && (
                  //     <div
                  //       className="absolute left-3 bottom-1/2 z-500 cursor-pointer text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
                  //       onClick={handlePrevImage}
                  //     >
                  //       {svgIcons.leftArrow}
                  //     </div>
                  //   )}

                  //   {images?.map((img, i) => {
                  //     return (
                  //       <div
                  //         className={`min-w-[634px] max-w-[634px] flex ${
                  //           count === i ? `block` : `hidden`
                  //         } `}
                  //         key={img?.id}
                  //       >
                  //         <div
                  //           className={`aspect-[${img.aspectRatio}] mx-auto my-auto  `}
                  //         >
                  //           <img
                  //             src={img?.croppedImageUrl}
                  //             alt=""
                  //             className={`aspect-[${img.aspectRatio}] max-h-postUploadImageMaxHeight object-cover `}
                  //           />
                  //         </div>
                  //       </div>
                  //     );
                  //   })}
                  //   {count < images.length - 1 && (
                  //     <div
                  //       className="absolute right-3 bottom-1/2 cursor-pointer z-500 text-white h-8 w-8 rounded-full bg-black bg-opacity-60 flex justify-center items-center"
                  //       onClick={handleNextImage}
                  //     >
                  //       {svgIcons.rightArrow}
                  //     </div>
                  //   )}
                  //   {images.length > 1 && (
                  //     <div className="flex  justify-center absolute gap-1 bottom-8 w-full text-center">
                  //       {images.map((_, index) => {
                  //         return (
                  //           <div
                  //             key={index}
                  //             className={`w-[6px] h-[6px] rounded-full  ${
                  //               index === count
                  //                 ? "bg-white"
                  //                 : "bg-imageDotColor"
                  //             }`}
                  //           ></div>
                  //         );
                  //       })}
                  //     </div>
                  //   )}
                  // </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
