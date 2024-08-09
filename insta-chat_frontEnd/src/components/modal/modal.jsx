import { Fragment, useState, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import uploadImage from "../../services/imageUpload";
import InsertPost from "../../services/uploadPost";
import { svgIcons } from "../../utils/constant";

export default memo(function Modal({ open, setOpen }) {
  const [urls, setUrls] = useState([]);

  const [images, setImages] = useState([]);

  const [caption, setCaption] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);

  // const cancelButtonRef = useRef(true);

  const [error, setError] = useState("");

  // useEffect(() => {
  //     console.log(urls, 'useeffent urls console')
  // }, [urls])

  function uploadPhoto(e) {
    const files = Object.values(e.target.files);
    // console.log(e.target.files, 'kkkkk');
    uploadImage(files)
      .then((data) => {
        setUrls(data);
        // console.log(urls, 'data urls')
      })
      .catch((err) => {
        // console.log(err, "catch errrr")
        setError(err);
      });

    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  }

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentSlide(newIndex);
  };

  console.log(images, "thisisimagesholding");
  return (
    <>
      {open && (
        <div className="fixed inset-0 w-full h-[100vh] z-100 overflow-y-auto bg-black bg-opacity-60">
          <div className="fixed right-2 top-2 sm:p-1 p-6">
            <button
              type="button"
              className="inline-flex p-1  text-base font-medium text-white  "
              onClick={() => {
                setImages([]);
                setOpen(false);
              }}
            >
              {svgIcons.whiteXCloseIcon}
            </button>
          </div>
          <div className="z-500 flex min-h-full justify-center w-full  items-center ">
            <div className="bg-white rounded-xl overflow-hidden md:w-[634px] w-[290px] h-[677px] ">
              <div className="flex items-center  py-5 justify-center w-full h-8 border-b border-borderColor">
                <h3 className="font-semibold">Create new post</h3>
              </div>
              <div className="sm:flex sm:items-center  h-postUploadChildContainer w-full">
                {images && images.length ? (
                  <div className="flex h-full w-full flex-col   rounded-md ">
                    <div className="flex justify-end  w-full mr-7 mb-1">
                      {urls.length ? (
                        <button
                          className=" m-1  text-sky-500 text-sm font-bold "
                          onClick={() => {
                            InsertPost(urls, caption);
                            setOpen(false);
                            setImages([]);
                          }}
                        >
                          Share
                        </button>
                      ) : (
                        <button
                          className=" m-1  text-sky-100 text-sm font-bold cursor-wait"
                          onClick={() => {
                            // InsertPost(urls)
                            // setOpen(false)
                            // setImages([])
                          }}
                        >
                          Share
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col mx-auto md:w-full h-full w-full ">
                      {!error ? (
                        <div className="relative w-full h-full">
                          <div
                            onScroll={handleScroll}
                            className="flex mb-3 overflow-x-auto w-[634px] snap-x snap-mandatory scrollbar-hide"
                          >
                            {images.map((img) => (
                              <div className="min-w-[634px]  h-full min-h-[500px] max-h-[550px]">
                                <img
                                  className="p-2 rounded-2xl w-full min-h-[550px] object-cover "
                                  src={img}
                                  alt="post"
                                />
                              </div>
                            ))}
                          </div>
                          {images.length > 1 && (
                            <div className="flex justify-center absolute gap-1 bottom-20 w-full text-center">
                              {images.map((image, index) => {
                                console.log("kasdflasldkfjlkdjflkonetow");
                                return (
                                  <>
                                    {images.length > 1 && (
                                      <div
                                        key={index}
                                        className={`w-[6px] h-[6px] rounded-full ${
                                          index === currentSlide
                                            ? "bg-white"
                                            : "bg-imageDotColor"
                                        }`}
                                      ></div>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          )}
                          <input
                            className="w-full pl-2 h-8 focus:outline-0"
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption"
                          />
                        </div>
                      ) : (
                        <div className="mx-auto min-w-full">
                          <h1>please select another image!</h1>
                        </div>
                      )}
                      {error ? <h1>{error[0]}</h1> : null}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-center  text-center  w-full h-full">
                    <div className="max-h-full  p-4  flex flex-col m-2 ">
                      <div className="">
                        <div className="flex justify-center ">
                          {svgIcons.postUploadModal}
                        </div>
                        <h1 className="text-xl my-4">Drag your photos here</h1>
                      </div>

                      <div className="flex  justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer py-2 px-3 rounded-md bg-sky-600 font-medium text-white  hover:pointer"
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

// <Transition.Root show={open} as={Fragment}>
// <Dialog as="div" className="relative z-10" onClose={setOpen}>
// </Dialog>
// </Transition.Root>
