import { useState } from "react";
import follow from "../../services/follow";
import unfollow from "../../services/unfollow";
import profilepicture from "../../services/addprofilepicture";
import { userImage } from "../../reduxgobalState/slices/userSlice";
import { useDispatch } from "react-redux";

export default function Maping({ friends, Heading, change, setChange }) {
  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(false);
  function Follow(id) {
    if (followed) {
      follow(id).then((data) => {
        console.log("followed");
      });
    } else {
      unfollow(id).then((data) => {
        console.log("unfollowed");
      });
    }
  }
  function setprofilepic(image) {
    profilepicture(image).then(({ data }) => {
      // console.log(data, 'setprofilepic')
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch(userImage(data.user.image));
      setChange(!change);
    });
  }
  return (
    <>
      {Heading !== "Update profile picture" ? (
        <div
          key={friends._id}
          className="flex flex-row p-3 items-center  justify-between w-full"
        >
          <div className="flex flex-row items-center justify-start">
            {friends.image ? (
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={friends.image}
                alt={friends.name}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-14 h-14"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <h1 className="ml-3">{friends.name}</h1>
          </div>
          {Heading === "Following" && (
            <div>
              {!followed ? (
                <button
                  className="flex text-blue-400 font-semibold text-[13px] justify-end"
                  onClick={() => {
                    return Follow(friends._id), setFollowed(!followed);
                  }}
                >
                  unfollow
                </button>
              ) : (
                <button
                  className="text-blue-400 font-semibold text-[13px]"
                  onClick={() => {
                    return Follow(friends._id), setFollowed(!followed);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="cursor-pointer w-full mx-auto">
          <div
            className=""
            onClick={() => setprofilepic(friends.image[0]?.url)}
          >
            <img
              className=" object-cover mx-auto h-24 w-24 hover:opacity-25 "
              src={friends.image[0]?.url}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
