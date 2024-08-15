import { useEffect, useState } from "react";
import clickLike from "../../services/like";
import addComment from "../../services/useaddcomment";
import popcomment from "../../services/popcomment";
import { refreshReducer } from "../../reduxgobalState/slices/appSlice";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { svgIcons } from "../../utils/constant";

export default function Modal({ post, open, setOpen }) {
  const [liked, setLiked] = useState();

  const [comment, setComment] = useState();

  const [currentSlide, setCurrentSlide] = useState(0);

  const [bounse, setBounse] = useState({ like: false, liked: false });

  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");
  const decoded = jwt_decode(token);
  const like = (postId) => {
    clickLike(postId).then((data) => {
      data.data.msg === "Liked" && setLiked(false);
      data.data.msg === "Unliked" && setLiked(true);
      setLiked(!liked);
      dispatch(refreshReducer());
    });
  };

  const Comments = (postId) => {
    addComment(postId, comment).then((data) => {
      setComment("");
      dispatch(refreshReducer());
    });
  };

  function deletecomment(postid, commentid) {
    popcomment(postid, commentid).then((data) => {
      dispatch(refreshReducer());
    });
  }

  useEffect(() => {
    post.Likes.includes(decoded.userId) ? setLiked(false) : setLiked(true);
  }, [decoded.userId, post]);

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentSlide(newIndex);
  };

  return (
    <>
      <div className="z-50 fixed top-3 right-3 flex justify-end">
        <button className="text-white" onClick={() => setOpen(!open)}>
          {svgIcons.whiteXCloseIcon}
          {/* <ClearSharpIcon /> */}
        </button>
      </div>
      <div className="fixed z-40 left-[50%] bg-black bg-opacity-60 top-[50%]  -translate-y-[50%] -translate-x-[50%] w-full h-full p-6 ">
        <div className="flex flex-wrap rounded-r-md  w-[350px] lg:w-[1200px] lg:h-[95vh] h-[650px] bg-white mx-auto brightness-100 overflow-y-auto scrollbar-hide">
          <div className="flex items-center sm:w-1/2 w-full h-1/2 sm:h-full ">
            <div className="flex flex-col items-center w-full">
              <div
                className="flex  h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-black"
                onClick={() => {
                  setOpen(!open);
                }}
                onScroll={handleScroll}
              >
                {post.image?.map((obj) => {
                  return (
                    <div className="flex min-w-full  snap-always snap-center justify-center place-items-center">
                      <img
                        className=" h-full max-h-[325px] sm:max-h-[96vh]  object-cover aspect-auto "
                        src={obj.url}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center relative gap-1 bottom-5 w-full text-center">
                {post.image.map((image, index) => {
                  return (
                    <>
                      {post.image.length > 1 && (
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
            </div>
          </div>
          <div className="flex flex-col bg-white  sm:w-1/2 w-full sm:h-full h-[500px] overflow-x-auto ">
            <div className="flex items-center h-20 border-b">
              {post?.user?.image ? (
                <img
                  className="ml-3 rounded-full w-11 h-11 object-cover"
                  src={post?.user?.image}
                  alt="noimage"
                />
              ) : (
                <div className="ml-3 rounded-full w-11 h-11">
                  {svgIcons.userIconBig}
                </div>
              )}
              <div className=" item-center">
                <h1 className="text-md font-medium ml-3">{post.user.name}</h1>
              </div>
            </div>
            <div className="flex sm:h-[553px] h-[250px] border-b">
              <div className="text-sx w-full font-semibold overflow-y-scroll scrollbar-hide text-black-400 ">
                {post.comments.map((com) => {
                  return (
                    <div className="flex justify-between flex-row p-5 w-100%">
                      <div className="flex mr-4">
                        {com?.commentBy?.image ? (
                          <img
                            className="w-8 h-8 rounded-full"
                            src={com?.commentBy?.image}
                            alt="noimage"
                          />
                        ) : (
                          <div className="">{svgIcons.userIconMedium}</div>
                        )}
                        <h1 className="font-semibold mr-1 ml-2 pt-1  cursor-pointer">
                          {com.commentBy.name}
                          <span className="text-sx pl-1 font-normal w-full">
                            {com.comment}{" "}
                          </span>
                        </h1>
                      </div>

                      {decoded.userId === com.commentBy._id ? (
                        <span
                          className="cursor-pointer"
                          onClick={() => deletecomment(post._id, com._id)}
                        >
                          <DeleteOutlineRoundedIcon />
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-32 border-b">
              <div className="flex flex-col    p-3">
                <div className="flex flex-row ">
                  {liked ? (
                    <div
                      className={`${
                        bounse.like ? ` animate-bouncing` : ``
                      } flex flex-row cursor-pointer `}
                      onClick={() => {
                        setLiked(!liked);
                        like(post._id);
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
                        like(post._id);
                      }}
                    >
                      {/* <FavoriteIcon /> */}
                      {svgIcons.redfillnotificationIcon}

                      {/* <h1>unlike</h1> */}
                    </div>
                  )}
                  {/* <div className="ml-2 flex flex-row cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                            </svg>

                                        </div> */}
                </div>
                <div className="flex flex-row">
                  <div className="flex justify-start pl-2 pt-5 ">
                    <h1 className="text-sx font-semibold">
                      {post.Likes.length} likes
                    </h1>
                  </div>
                  {/* <div className="flex justify-start pl-2 pt-5">
                        <h1 className="text-sx font-normal">
                          {post.comments.length} comments
                        </h1>
                      </div> */}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-start pl-7 border-y p-3 w-full">
                <div className="w-3/4">
                  <input
                    className="w-full focus:outline-0"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="w-1/4 flex justify-end">
                  {comment ? (
                    <button
                      className="text-sx font-semibold text-blue-400 "
                      onClick={() => Comments(post._id)}
                    >
                      post
                    </button>
                  ) : (
                    <p className="text-sx font-semibold text-blue-200 ">post</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
