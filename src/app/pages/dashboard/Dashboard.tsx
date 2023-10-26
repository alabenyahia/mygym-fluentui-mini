import useLogout from "../auth/hooks/useLogout";
import MobileLayout from "src/app/layouts/MobileLayout";

export default function Dashboard() {
  const { logout } = useLogout();
  return (
    <div>
      <MobileLayout>
        <h1>DASHBOARD</h1>
        <button
          onClick={() => {
            logout();
          }}
        >
          LOGOUT
        </button>
      </MobileLayout>
    </div>
  );
}
