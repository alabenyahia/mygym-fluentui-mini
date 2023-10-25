import { Routes , Route } from "react-router-dom";
import Login from "src/app/pages/auth/Login";
import Register from "src/app/pages/auth/Register";
import NotFound from "src/app/pages/not-found/NotFound";

export default function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
          path="*"
          element={<NotFound />}
        />
  </Routes>;
}
