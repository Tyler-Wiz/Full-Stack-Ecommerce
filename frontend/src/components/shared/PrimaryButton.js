import React from "react";

const PrimaryButton = ({ background, name, color, border, width }) => {
  return (
    <button
      className={`${background} ${color} ${border} ${width} px-4 py-2 
      rounded-full w-full mt-6 shadow-lg shadow-gray-200 text-center`}>
      {name}
    </button>
  );
};

export default PrimaryButton;
