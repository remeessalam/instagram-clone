import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import finduser from "../../services/finduser";
import Friend from "../suggestion/suggestion";
import Getuser from "../../services/getuser";

export default function Slide({ open, setOpen }) {
  const [find, setFind] = useState("");

  const [users, setUsers] = useState([]);

  const [accountholder, setAccountholder] = useState([]);

  useEffect(() => {
    find
      ? finduser(find).then((data) => {
          // console.log(data.data.result)
          setUsers(data.data.result);
        })
      : setUsers([]);
    Getuser().then((userdata) => {
      setAccountholder(userdata.data.user);
      // console.log(accountholder, 'holder=============')
    });
  }, [find]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 left-[60px] bg-green-900"
        onClose={setOpen}
      >
        {/* <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-opacity-75 transition-opacity" />
        </Transition.Child> */}

        <div className="fixed inset-0  left-[60px] overflow-hidden ml-14">
          <div className="absolute inset-0 left-[60px]  overflow-hidden ml-14">
            <div className="pointer-events-none fixed  inset-y-0 left-[60px] flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="-translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="-translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Search
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full " aria-hidden="true">
                          <div>
                            <div className="flex flex-row justify-start pl-7 border-b  border-gray-200 p-3 w-full">
                              <div className="w-3/4">
                                <input
                                  className="w-full focus:outline-0"
                                  type="text"
                                  placeholder="Search"
                                  value={find}
                                  onChange={(e) => setFind(e.target.value)}
                                />
                              </div>
                              <div className="w-1/4 flex justify-end">
                                {find ? (
                                  <button
                                    className="text-sx font-semibold text-blue-400 "
                                    onClick={() => finduser(find)}
                                  >
                                    Search
                                  </button>
                                ) : (
                                  <p className="text-sx font-semibold text-blue-200 ">
                                    Search
                                  </p>
                                )}
                              </div>
                            </div>
                            {users?.map((obj) => {
                              return (
                                <Friend
                                  key={obj._id}
                                  frnd={obj}
                                  userfollowing={accountholder}
                                  setOpen={setOpen}
                                  setFind={setFind}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
