import React from "react";

const Button = ({ name, color, backgroundColor, border }) => {
  return (
    <button
      className={`${color} ${backgroundColor} ${border} px-4 py-3 text-sm montserrat`}>
      {name}
    </button>
  );
};

export default Button;
