import { Routes, Route } from "react-router-dom";
import Login from "src/app/pages/auth/Login";
import Register from "src/app/pages/auth/Register";
import NotFound from "src/app/pages/not-found/NotFound";
import { RequireAuth } from "./RequireAuth";
import { RequireLoggedOut } from "./RequireLoggedOut";
import Dashboard from "src/app/pages/dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RequireLoggedOut />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
