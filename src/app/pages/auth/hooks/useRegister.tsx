import pb from "src/utils/db/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { RegisterDataType } from "src/utils/types/main";
import {
  useId,
  ToastTitle,
  useToastController,
  Toast,
} from "@fluentui/react-components";

export default function useRegister() {

  async function register(data: RegisterDataType) {
    const user = await pb.collection("users").create(data);
    return user;
  }

  // Mutations
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {

    },
    onError: ({ data }: any) => {
      const { data: errorData }: any = data;

    },
  });

  return { registerMutation };
}
