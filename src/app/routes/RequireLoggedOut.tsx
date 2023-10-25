import { Navigate, Outlet, useLocation } from "react-router-dom";
import pb from "src/utils/db/pocketbase";

export const RequireLoggedOut = () => {

  const location = useLocation();

  if (pb.authStore.isValid) {
    return (
      <Navigate to={{ pathname: "/" }} state={{ location }} replace />
    );
  }

  return <Outlet />;
};