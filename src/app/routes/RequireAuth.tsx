import { Navigate, Outlet, useLocation } from "react-router-dom";
import pb from "src/utils/db/pocketbase";

export const RequireAuth = () => {

  const location = useLocation();

  if (!pb.authStore.isValid) {
    return (
      <Navigate to={{ pathname: "/login" }} state={{ location }} replace />
    );
  }

  return <Outlet />;
};