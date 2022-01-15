import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
export function PrivateRoute({ children }) {
  const {
    authState: { isUserLogin },
  } = useAuth();

  let location = useLocation();

  return isUserLogin ? (
    children
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
