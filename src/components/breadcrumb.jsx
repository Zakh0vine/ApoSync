import { Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6">
      {/* Title Center */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-black relative pb-2">
          {pageName}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gray-300"></span>
        </h2>
      </div>

      {/* Breadcrumb Right */}
      <div className="flex justify-end mt-2">
        <nav>
          <ol className="flex items-center text-base text-gray-600">
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li className="text-[#2E56BD] mx-2 text-base font-medium">/</li>
            <li className="text-[#2E56BD] text-base font-medium">{pageName}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
