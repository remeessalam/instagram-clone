import React, { useState } from "react";

const Edit = () => {
  const [open, setOpen] = useState(false);
  const mapping = ["hello", "game", "water", "green"];
  return (
    <div className="flex justify-center mx-auto h-full bg-gray-300 m-5">
      <div className="w-[975px] shrink">
        <button onClick={() => setOpen(!open)}>open</button>
        <div class="grid relative grid-cols-3 gap-1 min-h-full">
          {mapping.map((item) => {
            return (
              <div className="relative bg-green-300 aspect-square hover:bg-red-200 text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&s"
                  alt=""
                  className=""
                />
                <div className="absolute top-0">{item}</div>
              </div>
            );
          })}
        </div>
        {open && <Modal fun={setOpen} boo={open} />}
      </div>
    </div>
  );
};

export default Edit;

const Modal = ({ fun, boo }) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-80">
      <div className="relative w-[980px] h-80 bg-gray-200 ">
        <h1 onClick={() => fun(!boo)}>this sample model</h1>
        <div className="absolute bottom-0 right-0">
          <h1>checking position</h1>
        </div>
      </div>
    </div>
  );
};
