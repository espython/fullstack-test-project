import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.tsx";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
