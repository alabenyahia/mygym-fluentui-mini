import pb from "src/utils/db/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { RegisterDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useRegister() {
  async function register(data: RegisterDataType) {
    const user = await pb.collection("users").create(data);
    return user;
  }

  // Mutations
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Register successfull, your can login now!");
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured in the registration process!");
      console.log("register error", data);
    },
  });

  return { registerMutation };
}
