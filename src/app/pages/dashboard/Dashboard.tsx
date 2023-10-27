import useLogout from "../auth/hooks/useLogout";

export default function Dashboard() {
  const { logout } = useLogout();
  return (
    <div>
      <h1>DASHBOARD</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}
