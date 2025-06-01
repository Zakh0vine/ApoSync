import clsx from "clsx";

function Select(props) {
  const { label, placeholder, id, error, options, register, name } = props;

  return (
    <div className="flex flex-col mb-2 w-full">
      <label className="mb-2 font-semibold text-black" htmlFor={id}>
        {label}
      </label>
      <select
        className={clsx(
          "border border-black rounded-md text-black p-2 py-[10px] focus:outline-none w-full cursor-pointer",
          error && "border-red-500"
        )}
        defaultValue=""
        {...(register ? register(name) : {})}
        {...props}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="break-words text-sm font-light text-red-500">
            {error}
          </span>
        </label>
      )}
    </div>
  );
}

export { Select };
