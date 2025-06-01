import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "@/utils/context/tokenContext";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useToken();

  if (!token) {
    return <Navigate to="/masuk" replace />;
  }

  if (!user) {
    // Tampilkan loader sementara atau null jika user belum siap
    return null;
  }

  // Hindari error karena huruf besar/kecil
  const userRole = user.role?.toLowerCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

  if (!normalizedAllowed.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
