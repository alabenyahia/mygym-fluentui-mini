import pb from "src/utils/db/pocketbase";
import jwtDecode from "jwt-decode";
import useLogout from "./useLogout";
import moment from "moment";

export default function useRefresh() {
  const { logout } = useLogout();
  
  async function refreshSession() {

    const token = pb.authStore.token;
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const tokenExpiration = decoded.exp * 1000;

    if (Date.now() >= tokenExpiration) {
      // token has expired
      logout();
      return;
    }

    const expiration = moment(tokenExpiration);
    const now = moment();
    const from = moment().subtract(2, "days");
    const isAboutToExpire = expiration.isBetween(from, now);

    if (isAboutToExpire) {
      // token is about to expire, refresh it
      await pb.collection("users").authRefresh();
    }
  }

  return { refreshSession };
}
