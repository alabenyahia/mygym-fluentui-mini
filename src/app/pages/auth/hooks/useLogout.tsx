import pb from "src/utils/db/pocketbase";
import { useAtom } from "jotai";
import { user as userAtom } from "src/utils/atoms/main";

export default function useLogout() {
  const [_, setUser] = useAtom(userAtom);

  function logout() {
    pb.authStore.clear();
    setUser(null);
  }
  return { logout };
}
