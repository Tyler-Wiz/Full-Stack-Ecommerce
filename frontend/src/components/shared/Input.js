import React from "react";

const Input = ({
  type,
  id,
  label,
  placeholder,
  value,
  name,
  onChange,
  ref,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="email" className="text-sm">
        {label}
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`block outline-none border-[1px] border-gray-400 rounded-lg px-3 py-3 w-[400px] `}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
