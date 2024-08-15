import { useEffect, useState } from "react";
import follow from "../../services/follow";
import unfollow from "../../services/unfollow";
import { Link } from "react-router-dom";
import { svgIcons } from "../../utils/constant";

function Friend({ frnd, userfollowing, setOpen, setFind, handleClose }) {
  const [followed, setFollowed] = useState(true);

  const [followed2, setFollowed2] = useState(false);

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    setFollowing(userfollowing?.following);
  }, [following, userfollowing?.following]);

  function Follow(id) {
    if (followed) {
      follow(id).then((data) => {});
    } else {
      unfollow(id).then((data) => {});
    }
  }
  function Follow2(id) {
    if (followed2) {
      follow(id).then((data) => {});
    } else {
      unfollow(id).then((data) => {});
    }
  }

  return (
    <div key={frnd._id} className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Link
          to={`/showuser/${frnd._id}`}
          onClick={() => {
            // setOpen(false);
            setFind("");
            handleClose();
          }}
        >
          <div className="flex flex-row items-center cursor-pointer">
            {frnd.image ? (
              <div>
                <img
                  className="w-11 h-11  rounded-full object-cover"
                  src={frnd.image}
                  alt="profile pic"
                />
              </div>
            ) : (
              <div>
                {svgIcons.userIconBig}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="1 1 23 23"
                  fill="currentColor"
                  className="w-14 h-14"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg> */}
              </div>
            )}
            <div>
              <h1 className="text-[14px] ml-2 font-semibold text-gray-900">
                {frnd.name}
              </h1>
              <h1 className="text-[12px] ml-2 font-normal text-gray-500">
                Suggested for you
              </h1>
            </div>
          </div>
        </Link>
        {!following?.some((element) => element._id === frnd._id) ? (
          followed ? (
            <button
              className="text-blue-400 font-semibold text-[13px]"
              onClick={() => {
                Follow(frnd._id);
                setFollowed(!followed);
              }}
            >
              Follow
            </button>
          ) : (
            <button
              className="text-blue-400 font-semibold text-[13px]"
              onClick={() => {
                Follow(frnd._id);
                setFollowed(!followed);
              }}
            >
              unfollow
            </button>
          )
        ) : !followed2 ? (
          <button
            className="text-blue-400 font-semibold text-[13px]"
            onClick={() => {
              Follow2(frnd._id);
              setFollowed2(!followed2);
            }}
          >
            unfollow
          </button>
        ) : (
          <button
            className="text-blue-400 font-semibold text-[13px]"
            onClick={() => {
              Follow2(frnd._id);
              setFollowed2(!followed2);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
export default Friend;
