import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddMemberDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useMembers() {
  const queryClient = useQueryClient();

  async function getMembers() {
    const members = await pb.collection("members").getFullList({
      sort: "-created",
      expand: "membership",
    });
    members.forEach((member: any) => {
      if (member.avatar) {
        const url = pb.files.getUrl(member, member.avatar, {
          thumb: "100x100",
        });
        member.avatar = url;
        console.log("member avatar", url);
      }
    });

    return members;
  }

  async function addMember(data: any) {
    console.log("add member daata", data);
    const member = await pb.collection("members").create(data);
    return member;
  }

  async function updateMember(id: string, data: any) {
    console.log("data from updatefn", data);
    delete data.id;
    const member = await pb
      .collection("members")
      .update(id, data, { expand: "membership" });
    return member;
  }

  //Queries
  const membersQuery = useQuery({ queryKey: ["members"], queryFn: getMembers });

  // Mutations
  const memberMutation = useMutation({
    mutationKey: ["members"],
    mutationFn: addMember,
    onSuccess: () => {
      toast.success("Member created successfully!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while creating member!");
      console.log("error creating member", data);
    },
  });

  const memberUpdateMutation = useMutation({
    mutationKey: ["memberUpdate"],
    mutationFn: ({ id, data }: any) => updateMember(id, data),
    onSuccess: () => {
      toast.success("Member updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating member!");
      console.log("error updating member", err);
    },
  });

  const memberDeleteMutation = useMutation({
    mutationKey: ["memberDelete"],
    mutationFn: ({ id, data }: any) => updateMember(id, data),
    onSuccess: () => {
      toast.success("Member deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting member!");
      console.log("error deleting member", data);
    },
  });

  return {
    memberMutation,
    membersQuery,
    memberUpdateMutation,
    memberDeleteMutation,
  };
}
