export const Loader = ({ fullScreen = false, size = "lg", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "h-auto"
      } bg-transparent ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-solid border-[#6499E9] border-t-transparent ${
          sizeClasses[size] || sizeClasses.lg
        }`}
      ></div>
    </div>
  );
};
