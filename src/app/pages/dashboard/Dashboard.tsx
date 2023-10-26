import DesktopLayout from "src/app/layouts/DesktopLayout";
import useLogout from "../auth/hooks/useLogout";
import MobileLayout from "src/app/layouts/MobileLayout";

export default function Dashboard() {
  const { logout } = useLogout();
  return (
    <div>
      <DesktopLayout>
        <h1>DASHBOARD</h1>
        <button
          onClick={() => {
            logout();
          }}
        >
          LOGOUT
        </button>
      </DesktopLayout>
    </div>
  );
}
