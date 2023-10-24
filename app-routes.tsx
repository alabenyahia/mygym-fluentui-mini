import { Routes , Route } from "react-router-dom";
import Login from "./src/app/auth/Login";
import Register from "./src/app/auth/Register";
import NotFound from "./not-found.tsx";

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
