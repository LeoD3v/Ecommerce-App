import React from "react";
import MyIcon from "../addIcon";
export default function CreateItemBtn({ setPortal }) {
  return (
    <div className=" absolute top-[-24px] right-[-16px] z-20 ">
      <button
        className="block  rounded-full border-2 border-white bg-white hover:border-blue-600 focus:outline-none shadow-xl"
        onClick={setPortal}
      >
        <MyIcon />
      </button>
    </div>
  );
}
