import React from "react";

const Button = ({
  name,
  color,
  backgroundColor,
  border,
  onClick,
  width,
  ...rest
}) => {
  return (
    <button
      className={`${color} ${backgroundColor} ${border} px-4 py-3 ${width} text-xs montserrat capitalize`}
      onClick={onClick}
      {...rest}>
      {name}
    </button>
  );
};

export default Button;
