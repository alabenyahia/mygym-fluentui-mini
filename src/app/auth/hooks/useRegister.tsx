import pb from "src/utils/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { RegisterDataType } from "src/utils/types/main";



export default function useRegister() {
  async function register(data: RegisterDataType) {
    const user = await pb.collection("users").create(data);
    return user;
  }

  // Mutations
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("user created!");
    },
    onError: ({ data }: any) => {
      const { data: errorData }: any = data;
      if (errorData.email.message) {
        console.log(errorData.email.message);
      } else {
        console.log(errorData);
      }
    },
  });

  return { registerMutation };
}
