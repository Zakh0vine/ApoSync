import React from "react";

function Toast({ title, description, variant = "default" }) {
  const variantStyles = {
    default: "bg-[#C8F3DD] border-[#23B000] text-black",
    destructive: "bg-[#F02626] border-[#F02626] text-white",
    deleted: "bg-[#23B000] border-[#23B000] text-white",
    edited: "bg-[#6499E9] border-[#2E56BD] text-white",
  };

  return (
    <div
      className={`flex items-start justify-between p-4 border rounded-md shadow-md space-x-4 ${variantStyles[variant]}`}
    >
      <div>
        {title && <h4 className="font-bold text-base pb-1">{title}</h4>}
        {description && <p className="text-text-base">{description}</p>}
      </div>
    </div>
  );
}

export default Toast;
