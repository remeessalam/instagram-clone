import { useState, useEffect } from "react";
import uploadImage from "../../services/imageUpload";
import InsertPost from "../../services/uploadPost";
import { svgIcons } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../reduxgobalState/slices/modalslice";
import CropImage from "./components/cropedImage/CropImage";
import getCroppedImg from "../../utils/helperFuntion";
import FilterImage from "./components/imagesfilter/ImagesFilter";
import Final from "./components/final/Final";

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
    // setSpinner(true);
    uploadImage(images)
      .then((data) => {
        let cloudinaryImage = data;
        if (cloudinaryImage) {
          console.log(cloudinaryImage, "htisisiddarasr");

          console.log(images, "thisisimagesinthisisok");
          // return;
          InsertPost(cloudinaryImage, caption, images);
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
    if (step === 3) {
      setStep((pre) => pre + 1);
      addImage();
      return;
    }
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
  console.log(images, "thisisimagesinmodal");
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
                setStep(0);
                setSpinner(false);
                setCaption("");
                setCrop({ x: 0, y: 0 });
                setImageCount(0);
                setNext(false);
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
                step > 1 && step !== 4 ? `md:w-[978px]` : `md:w-[634px]`
              } w-[290px] h-[675px] transition-all duration-700`}
            >
              <div
                className={`flex items-center py-5 px-2 ${
                  step === 4 ? `justify-center` : `justify-between`
                } w-full h-8 border-b border-borderColor`}
              >
                {step !== 4 && (
                  <span
                    onClick={handlePrev}
                    className={`${
                      step === 0 ? `invisible` : `visible`
                    } cursor-pointer`}
                  >
                    {svgIcons.leftArrow}
                  </span>
                )}
                <h3
                  className={`font-semibold ${step === 4 ? `text-center` : ``}`}
                >
                  {step === 0 && "Create new post"}
                  {step === 1 && "Crop"}
                  {step === 2 && "Edit"}
                  {step === 3 && "Create new post"}
                  {step === 4 && spinner ? "Sharing" : "Post shared"}
                </h3>
                {next ? (
                  <h3
                    className="cursor-pointer font-semibold text-sm text-sky-500 hover:text-blue-900"
                    onClick={handleNext}
                  >
                    {step === 3 ? "Share" : step === 4 ? "" : "Next"}
                  </h3>
                ) : (
                  <div
                    className={`relative group ${
                      step === 0 || step === 4 ? `invisible` : `visible`
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
                )}
                {step === 3 && (
                  <Final
                    images={images}
                    setImages={setImages}
                    setCaption={setCaption}
                  />
                )}
                {step === 4 && (
                  <div className="w-full h-full flex justify-center items-center">
                    {!spinner ? (
                      <div className="flex flex-col w-full items-center">
                        <img
                          className="w-24 h-34"
                          src="https://static.cdninstagram.com/rsrc.php/v3/yU/r/b_y28Mnuau9.gif"
                          alt=""
                        />
                        <h4 className="text-xl font-medium">
                          Your post has been shared.
                        </h4>
                      </div>
                    ) : (
                      <div className="w-24 h-34">
                        <img
                          className="w-24 h-34"
                          src="https://static.cdninstagram.com/rsrc.php/v3/yE/r/psJ2tFS95qs.gif"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
