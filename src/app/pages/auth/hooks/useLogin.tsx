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

  async function login({ email, password }: LoginDataType) {
    const user = await pb.collection("users").authWithPassword(email, password);
    return user;
  }

  // Mutations
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      
    },
    onError: (error: any) => {
      
    },
  });

  return { loginMutation };
}
