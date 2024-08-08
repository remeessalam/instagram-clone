import { useState, useEffect } from "react";
import finduser from "../../services/finduser";
import Friend from "../suggestion/Suggestion";
import Getuser from "../../services/getuser";
import Spinner from "../spinner/Spinner";
const Search = ({ open, setOpen, handleClose }) => {
  const [find, setFind] = useState("");

  const [users, setUsers] = useState([]);

  const [accountholder, setAccountholder] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    find && setLoading(true);
    find
      ? finduser(find).then((data) => {
          // console.log(data.data.result)
          setUsers(data.data.result);
          setLoading(false);
        })
      : setUsers([]);
    Getuser().then((userdata) => {
      setAccountholder(userdata.data.user);
      // console.log(accountholder, 'holder=============')
    });
  }, [find]);
  return (
    <div
      className={`absolute transition-all ease-in-out duration-200 overflow-hidden ${
        !open
          ? `w-[0px] left-[244px] border-0 `
          : `w-[420px] left-[80px] border-r border-borderColor rounded-r-2xl `
      }  h-screen  z-50 `}
    >
      <div className="  h-screen">
        <div className="flex h-full  flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="text-2xl font-semibold text-gray-900 my-5 ml-5">
            Search
          </div>

          <div className="h-full " aria-hidden="true">
            <div>
              <div className="flex flex-row m-4  rounded-lg justify-between pl-7  bg-newinputfieldbg   p-3 max-w-full">
                <div className="w-3/4 ">
                  <input
                    className="w-full focus:outline-0 text-black  bg-newinputfieldbg"
                    type="text"
                    placeholder="Search"
                    value={find}
                    onChange={(e) => setFind(e.target.value)}
                  />
                </div>
                <div className="w-1/4 flex justify-end">
                  {find ? (
                    loading ? (
                      <Spinner />
                    ) : (
                      <div
                        onClick={() => setFind("")}
                        className="flex justify-center items-center  text-center font-semibold rounded-full w-6 h-6 "
                      >
                        <img
                          src="/svg/gray-close-circle.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      // <button
                      //   className="text-sx flex items-center justify-center bg-c7 text-gray-200 rounded-full w-4 h-4 font-thin"
                      //   onClick={() => finduser(find)}
                      // >
                      //   x
                      // </button>
                    )
                  ) : (
                    <div
                      onClick={() => setFind("")}
                      className="flex justify-center items-center  text-center font-semibold rounded-full w-6 h-6 "
                    >
                      <img
                        src="/svg/gray-close-circle.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b border-borderColor my-5"></div>
              {users?.map((obj) => {
                return (
                  <div className="m-3">
                    <Friend
                      handleClose={handleClose}
                      key={obj._id}
                      frnd={obj}
                      userfollowing={accountholder}
                      setOpen={setOpen}
                      setFind={setFind}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
