import clsx from "clsx";

function Input(props) {
  const { label, id, error, register, name, type, className, placeholder } =
    props;

  return (
    <div className="flex flex-col mb-2 w-full">
      <label className="mb-2 font-semibold text-black" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className={clsx(
          "border border-black rounded-md text-black p-2 focus:outline-none w-full",
          error && "border-red-500",
          className
        )}
        {...(register
          ? register(name, {
              valueAsNumber: type === "number" ? true : false,
            })
          : {})}
        {...props}
      />
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

export { Input };
