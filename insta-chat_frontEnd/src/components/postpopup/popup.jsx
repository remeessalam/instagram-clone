import { useEffect, useState } from "react";
import clickLike from "../../services/like";
import addComment from "../../services/useaddcomment";
import popcomment from "../../services/popcomment";
import { refreshReducer } from "../../reduxgobalState/slices/appSlice";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function Modal({ open, setOpen, posts }) {
  const [liked, setLiked] = useState();

  const [comment, setComment] = useState();

  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");
  const decoded = jwt_decode(token);
  // console.log(posts)
  const like = (postId) => {
    clickLike(postId).then((data) => {
      // console.log(data, 'likedta')
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
    posts.Likes.includes(decoded.userId) ? setLiked(false) : setLiked(true);
  }, [decoded.userId, posts]);

  return (
    <div className="">
      {open && (
        <div className="fixed left-[50%] top-[50%]  -translate-y-[50%] -translate-x-[50%] w-full h-full p-6 ">
          <div className="flex flex-wrap modal-content border w-[350px] lg:w-[1200px] lg:h-[700px] h-[650px] bg-white mx-auto brightness-100 overflow-y-auto scrollbar-hide">
            <div className="w-full flex justify-end ">
              <button
                className="fixed sm:bg-inherit bg-white"
                onClick={() => setOpen(!open)}
              >
                <ClearSharpIcon />
              </button>
            </div>
            <div className="flex items-center sm:w-1/2 w-full h-1/2 sm:h-full bg-black ">
              <div className="flex items-center w-full">
                <div
                  className="flex  h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-black"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {posts.image?.map((obj) => {
                    return (
                      <div className="flex grid min-w-full snap-always snap-center justify-center place-items-center">
                        <img
                          className=" h-full max-h-[325px] sm:max-h-[700px]  object-cover aspect-auto "
                          src={obj.url}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-white  sm:w-1/2 w-full sm:h-full h-[500px] overflow-x-auto ">
              <div className="flex items-center h-20 border-b">
                <img
                  className="ml-3 rounded-full w-11 h-11 object-cover"
                  src={posts.image[0]?.url}
                  alt=""
                />
                <div className=" item-center">
                  <h1 className="text-md font-medium ml-3">
                    {posts.user.name}
                  </h1>
                </div>
              </div>
              <div className="flex sm:h-[450px] h-[250px] border-b">
                <div className="text-sx w-full font-semibold overflow-y-scroll scrollbar-hide text-black-400 ">
                  {posts.comments.map((com) => {
                    return (
                      <div className="flex flex-row p-5 w-100%">
                        <div className="min-w-28">
                          <p className="font-normal mr-1 w-28 cursor-pointer">
                            {com.commentBy.name}{" "}
                          </p>
                        </div>
                        <h1 className="text-sx font-medium ml-2 w-full">
                          {com.comment}{" "}
                        </h1>
                        {decoded.userId === com.commentBy._id ? (
                          <span
                            className="cursor-pointer"
                            onClick={() => deletecomment(posts._id, com._id)}
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
                        className="flex flex-row cursor-pointer"
                        onClick={() => {
                          like(posts._id);
                        }}
                      >
                        <FavoriteBorderRoundedIcon />
                      </div>
                    ) : (
                      <div
                        className="flex flex-row cursor-pointer"
                        onClick={() => {
                          like(posts._id);
                        }}
                      >
                        <FavoriteIcon />
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
                      <h1 className="text-sx font-normal">
                        {posts.Likes.length} likes
                      </h1>
                    </div>
                    <div className="flex justify-start pl-2 pt-5">
                      <h1 className="text-sx font-normal">
                        {posts.comments.length} comments
                      </h1>
                    </div>
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
                        onClick={() => Comments(posts._id)}
                      >
                        post
                      </button>
                    ) : (
                      <p className="text-sx font-semibold text-blue-200 ">
                        post
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
