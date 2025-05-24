import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useToken } from "@/utils/context/tokenContext";

const ProtectedRoute = () => {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/masuk" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
