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
    const user = await pb.collection("users").getOne(pb.authStore?.model?.id);

    if (user.avatar) {
      const url = pb.files.getUrl(user, user.avatar, { thumb: "100x100" });
      user.avatar = url;
    }
    console.log("user logged", user);
    return user;
  }

  async function updateTask(data: any) {
    const user = await pb
      .collection("users")
      .update(pb.authStore?.model?.id, data);
    return user;
  }

  async function updateProfile(data: any) {
    console.log("data from updatefn", data);
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

  const updateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating profile!");
      console.log("error updating profile", err);
    },
  });

  return {
    loginMutation,
    updateTaskMutation,
    updateProfileMutation,
    getUserQuery,
  };
}
