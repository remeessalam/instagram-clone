import { useEffect, useState } from "react";
import clickLike from "../../services/like";
import Lastseen from "../showposttime/Addedtime";
import jwt_decode from "jwt-decode";
import { refreshReducer } from "../../reduxgobalState/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import addComment from "../../services/useaddcomment";
import Popup from "../postpopup/Popup";
import { svgIcons } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ e }) => {
  const [liked, setLiked] = useState();

  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const [open, setOpen] = useState(false);

  const [bounse, setBounse] = useState({ like: false, liked: false });

  const [caption, setCaption] = useState("");

  const [isTruncated, setIsTruncated] = useState(false);

  const [showFullCaption, setShowFullCaption] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");
  const decoded = jwt_decode(token);

  const openModalState = useSelector((state) => state.modal.openModalState);

  useEffect(() => {
    e.Likes.includes(decoded.userId) ? setLiked(false) : setLiked(true);
  }, [decoded.userId, e]);

  useEffect(() => {
    const truncateText = (text, limit) => {
      if (text.length <= limit)
        return { truncatedText: text, truncated: false };

      const truncatedText = text.slice(0, limit) + "... ";
      return { truncatedText, truncated: true };
    };

    const limit = 50; // Adjust the limit as needed
    const { truncatedText, truncated } = truncateText(e.caption, limit);

    setCaption(truncatedText);
    setIsTruncated(truncated);
  }, [e.caption]);

  const like = (postId) => {
    clickLike(postId).then((data) => {
      dispatch(refreshReducer());
    });
  };

  const Comments = async (postId) => {
    try {
      const data = await addComment(postId, comment, navigate);
      if (data) {
        setComment("");
        dispatch(refreshReducer());
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentSlide(newIndex);
  };
  console.log(e, "thiadjsfifjasdifj");

  console.log(
    e.image.some((obj) => obj.aspectRatio === 4 / 5),
    "hasdhflkahdfklajsldkf"
  );

  return (
    <div
      key={e._id}
      className=" flex flex-col  mx-auto rounded-md lg:w-[468px] w-full mb-3 drop-shadow-l"
    >
      {open && <Popup open={open} setOpen={setOpen} post={e} />}
      <div className="flex justify-between items-center min-h-18 my-[12px] mt-1">
        <div className="flex cursor-pointer">
          {e.user.image ? (
            <Link to={`/showuser/${e?.user?._id}`}>
              <img
                className="rounded-full w-9 h-9 object-cover"
                src={e.user.image}
                alt=""
              />
            </Link>
          ) : (
            <Link to={`/showuser/${e?.user?._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
          <div className="flex items-center">
            <Link to={`/showuser/${e?.user?._id}`}>
              <h1 className="text-justify font-semibold text-sm ml-3">
                {e.user.name}
              </h1>
            </Link>
            <span className="pb-[7.5px] mx-[5px] font-bold text-lg text-gray-500">
              .
            </span>
            <h1 className="text-sm text-gray-500">
              <Lastseen time={e.createdAt} />
            </h1>
          </div>
        </div>
        <div className="cursor-pointer">{svgIcons.threeDot}</div>
      </div>
      <div className="rounded-lg  overflow-hidden bg-black min-h-[468px]  max-h-[585px]">
        <div
          className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-black"
          onDoubleClick={() => {
            like(e._id);
          }}
          onScroll={handleScroll}
        >
          {e.image.map((obj, i) => {
            console.log(
              obj.aspectRatio === 1 / 1 || obj.aspectRatio === 4 / 5,
              "jsldkfkalsdjfasdkf"
            );
            return (
              <div
                key={obj._id}
                className="flex min-w-full rounded-lg justify-center snap-always snap-center"
              >
                {/* min-h-[468px] max-h-[585px] */}
                <img
                  className={`${
                    obj?.aspectRatio &&
                    (obj.aspectRatio === 1 / 1 || obj.aspectRatio !== 4 / 5)
                      ? e.image.some((obj) => obj.aspectRatio === 4 / 5)
                        ? `object-contain`
                        : obj.aspectRatio === 16 / 10 ||
                          obj.aspectRatio === 16 / 9
                        ? `object-contain`
                        : `object-cover`
                      : `object-contain`
                  }  `}
                  style={{
                    aspectRatio: obj?.aspectRatio && obj.aspectRatio,
                    filter:
                      obj.filter && obj.filter.filter !== ""
                        ? obj.filter.filter
                        : "",
                  }}
                  src={obj.url ? obj?.url : obj?.cloudinaryImage?.url}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        {e.image.length > 1 && (
          <div
            className={`flex justify-center ${
              openModalState ? `!hidden` : `relative`
            } z-0   gap-1 bottom-5 w-full text-center`}
          >
            {e.image.map((image, index) => {
              return (
                <div
                  // className={`${open ? "hidden" : "relative"}`}
                  key={image.url}
                >
                  {e.image.length > 1 && (
                    <div
                      className={`w-[6px] h-[6px] rounded-full ${
                        index === currentSlide ? "bg-white" : "bg-imageDotColor"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between py-3">
        <div className="flex flex-row ">
          {liked ? (
            <div
              className={`${
                bounse.like ? ` animate-bouncing` : ``
              } flex flex-row cursor-pointer `}
              onClick={() => {
                setLiked(!liked);
                like(e._id);
                setBounse((prev) => ({ ...prev, liked: true }));

                setTimeout(() => {
                  setBounse((prev) => ({ ...prev, liked: false }));
                }, 350);
              }}
              onMouseLeave={() => {
                setBounse((prev) => ({ ...prev, like: true }));

                setTimeout(() => {
                  setBounse((prev) => ({ ...prev, like: false }));
                }, 350);
              }}
            >
              {/* <FavoriteBorderRoundedIcon /> */}
              {/* <h1>like</h1> */}
              {svgIcons.likeIcon}
            </div>
          ) : (
            <div
              className={`${
                bounse.liked ? ` animate-bouncing` : ``
              }flex flex-row cursor-pointer  `}
              onClick={() => {
                setLiked(!liked);
                like(e._id);
              }}
            >
              {/* <FavoriteIcon /> */}
              {svgIcons.redfillnotificationIcon}

              {/* <h1>unlike</h1> */}
            </div>
          )}
          <div
            className="ml-4 flex flex-row cursor-pointer"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {svgIcons.commentIcon}

            {/* <h1>comment</h1> */}
          </div>
          <div
            className="ml-4 flex flex-row cursor-pointer"
            // onClick={() => {
            //   setOpen(!open);
            // }}
          >
            {svgIcons.sendGrayIcon}

            {/* <h1>comment</h1> */}
          </div>
        </div>
        <div>
          <div className="ml-4 flex flex-row cursor-pointer">
            {svgIcons.saveIcon}
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <h1 className="text-sm font-semibold pr-5 ">{e.Likes.length} likes</h1>
        {/* <h1
          className="text-sx font-normal cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {e.comments.length} comments
        </h1> */}
      </div>
      <div className="flex flex-row justify-start w-full">
        <h1
          className={`${
            showFullCaption ? ` ` : `line-clamp-3 overflow-hidden`
          }text-sx font-medium pb-4 h-auto  text-left w-full`}
        >
          {e.user.name + " "}
          <span
            className={`${
              e.caption ? `` : `mb-4`
            }w-full pb-4 font-light text-sx`}
          >
            {showFullCaption ? e.caption : caption}
            {isTruncated && !showFullCaption && (
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowFullCaption(true)}
              >
                more
              </span>
            )}
          </span>
        </h1>

        {/* <p className={`${e.caption ? `` : `mb-4`}pl-1 pb-4 font-light text-sx`}>
          {e.caption}
        </p> */}
      </div>
      <div className="cursor-pointer">
        {e.comments.length ? (
          <h1
            onClick={() => {
              setOpen(!open);
            }}
            className="text-sm mb-3 text-addcommentText"
          >
            View all {e.comments.length} comments
          </h1>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row justify-start text-sm border-borderColor border-b pb-4 w-full">
        <div className="w-3/4">
          <input
            className="w-full focus:outline-0"
            type="text"
            placeholder="Add a comment..."
            value={comment || ""}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div className="w-1/4 flex items-center gap-2 justify-end">
          <button
            className="text-sx font-semibold text-blue-400 hover:text-sky-900"
            onClick={() => Comments(e._id)}
          >
            {comment?.length ? "post" : ""}
          </button>
          <div>{svgIcons.imojiIcon}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
