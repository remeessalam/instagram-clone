import { useState, memo } from "react";
import uploadImage from "../../services/imageUpload";
import InsertPost from "../../services/uploadPost";
import { svgIcons } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../reduxgobalState/slices/modalslice";
import CropImage from "./components/CropImage";
import getCroppedImg from "../../utils/helperFuntion";

export default memo(function Modal() {
  const [spinner, setSpinner] = useState(false);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState();
  const [open, setOpen] = useState("");
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  const openModalState = useSelector((state) => state.modal.openModalState);

  function uploadPhoto(e) {
    const files = Object.values(e.target.files);
    setImageFile(files);
    files.forEach((img) => {
      console.log(img, "imagefromcloudinary");
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((prev) => [
          ...prev,
          {
            url: readerEvent.target.result,
            id: prev.length,
            cropped: false,
            croppedPixel: {},
            croppedImageUrl: "",
            aspectRatio: null,
          },
        ]);
      };
    });

    setStep(1);
  }

  const addImage = () => {
    setSpinner(true);
    console.log(imageFile, "thisispostaftercloudinary");
    uploadImage(imageFile)
      .then((data) => {
        if (data) {
          InsertPost(data, caption);
          dispatch(openModal());
          setImages([]);
        }
        setSpinner(false);
        console.log(data, "thisisdatafromupload");
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentSlide(newIndex);
  };

  const handleNext = () => {
    setStep((pre) => pre + 1);
    images.forEach((img, i) => {
      if (img.cropped) return;
      showCroppedImage(images[i]);
    });
  };

  const showCroppedImage = async (image, count) => {
    try {
      console.log(image, "akjshfkjashdfkjhadhfjkfdsj");
      const croppedImages = await getCroppedImg(image.url, image.croppedPixel);
      console.log("donee", croppedImages);
      if (croppedImages) {
        setImages((prev) => {
          const updatedImages = [...prev];
          updatedImages[count] = {
            ...updatedImages[count],
            croppedImageUrl: croppedImages,
          };
          return updatedImages;
          if (prev !== null) {
            console.log(prev, "akjshfkjashdfkjhadhfjkfdsj");
            return [{ ...(prev[count].url = croppedImages), cropped: true }];
          }
          console.log(prev, "akjshfkjashdfkjhadhfjkfdsj");
          return [{ ...image, url: croppedImages, cropped: true }];
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  console.log(croppedImage, "akjshfkjashdfkjhadhfjkfdsj");
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
            <div className="bg-white  rounded-xl overflow-hidden md:w-[634px] w-[290px] h-[675px]">
              <div className="flex items-center py-5 px-2 justify-between w-full h-8 border-b border-borderColor">
                {svgIcons.leftArrow}
                <h3 className="font-semibold">Create new post</h3>
                <h3 onClick={handleNext}>next</h3>
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
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    setImageFile={setImageFile}
                    showCroppedImage={showCroppedImage}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                    croppedAreaPixels={croppedAreaPixels}
                    setImages={setImages}
                    setAspectRatio={setAspectRatio}
                    aspectRatio={aspectRatio}
                  />
                )}
                {step === 2 && (
                  <div
                    className={`flex min-w-[634px] h-full overflow-scroll transition-all duration-900 overflow-x-auto snap-x snap-mandatory scrollbar-hide`}
                  >
                    {images?.map((img) => (
                      <div
                        className="min-w-[634px] max-w-[634px] flex "
                        key={img?.id}
                      >
                        <div
                          className={`aspect-[${aspectRatio} mx-auto my-auto  `}
                        >
                          <img
                            src={img?.croppedImageUrl}
                            alt=""
                            className={`aspect-[${aspectRatio}] h-[100%] object-cover brightness-100 contrast-50 saturate-100`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

/** CAPTION IS HERER */
/* <input
className="w-full pl-2 h-8 focus:outline-0"
type="text"
value={caption}
onChange={(e) => setCaption(e.target.value)}
placeholder="Write a caption"
/> */

//BUTTON IS HERE TO
/* <div className="flex justify-end w-full mr-7 mb-1">
{!spinner ? (
  <button
    className="m-1 text-sky-500 text-sm font-bold"
    onClick={() => {
      addImage();
    }}
  >
    Share
  </button>
) : (
  <button
    className="m-1 text-sky-100 text-sm font-bold cursor-wait"
    onClick={() => {}}
  >
    Share
  </button>
)}
</div> */

// images && images.length ? (
//   <div className=" flex h-full w-full flex-col rounded-md">
//     <div className="flex  flex-col mx-auto md:w-full w-full">
//       {!error ? (
//         <div className="relative w-full h-full">
//           <div
//             onScroll={handleScroll}
//             className="flex  overflow-x-auto w-[634px] snap-x snap-mandatory scrollbar-hide"
//           >
//             {images.map((img, index) => {
//               console.log(img, "thisisimage");
//               return (
//                 <div key={index} className="min-w-[634px]">
//                   <img
//                     className=" aspect-square object-cover"
//                     src={img}
//                     alt="post"
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           {images.length > 1 && (
//             <div className="flex  justify-center absolute gap-1 bottom-20 w-full text-center">
//               {images.map((_, index) => {
//                 return (
//                   <div
//                     key={index}
//                     className={`w-[6px] h-[6px] rounded-full ${
//                       index === currentSlide
//                         ? "bg-white"
//                         : "bg-imageDotColor"
//                     }`}
//                   ></div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="mx-auto min-w-full">
//           <h1>Please select another image!</h1>
//         </div>
//       )}
//       {error && <h1>{error[0]}</h1>}
//     </div>
//   </div>

// <div className="mt-3  flex items-center justify-center text-center w-full h-full">
//   <div className="max-h-full p-4 flex flex-col m-2">
//     <div className="">
//       <div className="flex justify-center">
//         {svgIcons.postUploadModal}
//       </div>
//       <h1 className="text-xl my-4">Drag your photos here</h1>
//     </div>
//     <div className="flex justify-center text-sm text-gray-600">
//       <label
//         htmlFor="file-upload"
//         className="relative cursor-pointer py-2 px-3 rounded-md bg-sky-600 font-medium text-white hover:pointer"
//       >
//         <span>Select from computer</span>
//         <input
//           id="file-upload"
//           name="file-upload"
//           type="file"
//           multiple
//           className="sr-only"
//           onChange={uploadPhoto}
//         />
//       </label>
//     </div>
//   </div>
// </div>
