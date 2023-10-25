import pb from "src/utils/db/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { LoginDataType } from "src/utils/types/main";
import {
  useId,
  ToastTitle,
  useToastController,
  Toast,
} from "@fluentui/react-components";

export default function useLogin() {
  const loginToasterId = useId("loginToaster");
  const { dispatchToast } = useToastController(loginToasterId);

  async function login({ email, password }: LoginDataType) {
    const user = await pb.collection("users").authWithPassword(email, password);
    return user;
  }

  // Mutations
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      dispatchToast(
        <Toast>
          <ToastTitle>Login successfull!</ToastTitle>
        </Toast>,
        {
          timeout: 400,
          intent: "success",
        }
      );
    },
    onError: (error: any) => {
      dispatchToast(
        <Toast>
          <ToastTitle>
            Failed to sign in, please check your credentials.
          </ToastTitle>
        </Toast>,
        { timeout: 2500, intent: "error" }
      );
    },
  });

  return { loginMutation, loginToasterId };
}
