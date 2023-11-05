import pb from "src/utils/db/pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginDataType } from "src/utils/types/main";
export default function useLogin() {
  const queryClient = useQueryClient();

  async function login({ email, password }: LoginDataType) {
    const user = await pb.collection("users").authWithPassword(email, password);
    return user;
  }

  async function getLoggedInUser() {
    const user = await pb
      .collection("users")
      .getOne(pb.authStore?.model?.id);
      console.log("user logged", user)
    return user;
  }

  async function updateTask(data: any) {
    const user = await pb
      .collection("users")
      .update(pb.authStore?.model?.id, data);
    return user;
  }

  //Queries
  const getUserQuery = useQuery({
    queryKey: ["getUser"],
    queryFn: getLoggedInUser,
  });

  // Mutations
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (error: any) => {
      toast.error("Error occured while trying to loggin!");
      console.log("login error", error);
    },
  });

  const updateTaskMutation = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("You finished a new task!");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while finishing task!");
      console.log("error updating task", err);
    },
  });

  return { loginMutation, updateTaskMutation, getUserQuery };
}
