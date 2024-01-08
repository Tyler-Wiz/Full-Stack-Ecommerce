const Input = ({ register, name, error, label, width, ...rest }) => {
  return (
    <div className="mb-4 relative">
      {label && (
        <label htmlFor={name} className="text-xs ml-2">
          {label}
        </label>
      )}
      <input
        className={`block outline-none border-[1px] border-gray-400 ${width} rounded-lg px-3 py-3 w-full mb-1 `}
        {...register(name)}
        {...rest}
      />
      {error && (
        <span role="alert" className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
