import { Routes, Route } from "react-router-dom";
import Login from "src/app/pages/auth/Login";
import Register from "src/app/pages/auth/Register";
import NotFound from "src/app/pages/not-found/NotFound";
import { RequireAuth } from "./RequireAuth";
import { RequireLoggedOut } from "./RequireLoggedOut";
import Dashboard from "src/app/pages/dashboard/Dashboard";
import {
  Classes,
  Coaches,
  DiscountCodes,
  GymStaff,
  Members,
  Memberships,
  Programs,
  Transactions,
} from "src/app/pages/manage";
import Reports from "src/app/pages/reports/Reports";

import LayoutDefaultRoute from "./LayoutDefaultRoute";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RequireLoggedOut />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/" element={<LayoutDefaultRoute element={Dashboard} />} />

        <Route
          path="/manage/members"
          element={<LayoutDefaultRoute element={Members} />}
        />
        <Route
          path="/manage/memberships"
          element={<LayoutDefaultRoute element={Memberships} />}
        />
        <Route
          path="/manage/programs"
          element={<LayoutDefaultRoute element={Programs} />}
        />
        <Route
          path="/manage/classes"
          element={<LayoutDefaultRoute element={Classes} />}
        />
        <Route
          path="/manage/discountcodes"
          element={<LayoutDefaultRoute element={DiscountCodes} />}
        />
        <Route
          path="/manage/gymstaff"
          element={<LayoutDefaultRoute element={GymStaff} />}
        />
        <Route
          path="/manage/coaches"
          element={<LayoutDefaultRoute element={Coaches} />}
        />
        <Route
          path="/manage/transactions"
          element={<LayoutDefaultRoute element={Transactions} />}
        />

        <Route
          path="/reports"
          element={<LayoutDefaultRoute element={Reports} />}
        />

        <Route
          path="/profile"
          element={<LayoutDefaultRoute element={Profile} />}
        />

        {/* <Route
          path="/calendar"
          element={<LayoutDefaultRoute element={Calendar} />}
        /> */}

        {/* <Route
          path="/communication"
          element={<LayoutDefaultRoute element={Communication} />}
        /> */}
      </Route>

      <Route path="*" element={<LayoutDefaultRoute element={NotFound} />} />
    </Routes>
  );
}
