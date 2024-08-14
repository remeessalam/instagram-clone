import React from "react";

const Edit = () => {
  const mapping = ["hello", "game", "water", "green"];
  return (
    <div className="flex justify-center mx-auto h-full bg-gray-300 m-5">
      <div className="w-[975px] shrink">
        <div class="grid grid-cols-3 gap-1 min-h-full">
          {mapping.map((item) => {
            return (
              <div className="bg-green-300 aspect-square  text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&s"
                  alt=""
                  className=""
                />
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Edit;
