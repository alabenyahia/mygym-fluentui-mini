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
  const registerToasterId = useId("registerToaster");
  const { dispatchToast } = useToastController(registerToasterId);

  async function register(data: RegisterDataType) {
    const user = await pb.collection("users").create(data);
    return user;
  }

  // Mutations
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      dispatchToast(
        <Toast>
          <ToastTitle>Congratulations! registered successfully</ToastTitle>
        </Toast>,
        { timeout: 2500, intent: "success" }
      );
    },
    onError: ({ data }: any) => {
      const { data: errorData }: any = data;

      dispatchToast(
        <Toast>
          <ToastTitle>
            {errorData.email?.message
              ? errorData.email?.message
              : "Error occured!"}
          </ToastTitle>
        </Toast>,
        { timeout: 2500, intent: "error" }
      );
    },
  });

  return { registerMutation, registerToasterId };
}
