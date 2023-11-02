import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddMembershipDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useMemberships() {
  const queryClient = useQueryClient();

  async function getMemberships() {
    const memberships = await pb.collection("memberships").getFullList({
      sort: "-created",
    });
    return memberships;
  }

  async function addMembership(data: AddMembershipDataType) {
    const membership = await pb.collection("memberships").create(data);
    return membership;
  }

  async function updateMembership(id: string, data: any) {
    delete data.id;
    const membership = await pb.collection("memberships").update(id, data);
    return membership;
  }

  //Queries
  const membershipsQuery = useQuery({
    queryKey: ["memberships"],
    queryFn: getMemberships,
  });

  // Mutations
  const membershipAddMutation = useMutation({
    mutationKey: ["memberships"],
    mutationFn: addMembership,
    onSuccess: () => {
      toast.success("Membership created successfully!");
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: ({ data }: any) => {
      toast.error("Error occured while creating membership!");
      console.log("error creating membership", data);
    },
  });

  const membershipUpdateMutation = useMutation({
    mutationKey: ["membershipUpdate"],
    mutationFn: ({ id, data }: any) => updateMembership(id, data),
    onSuccess: () => {
      toast.success("Membership updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating membership!");
      console.log("error updating membership", err);
    },
  });

  const membershipDeleteMutation = useMutation({
    mutationKey: ["membershipDelete"],
    mutationFn: ({ id, data }: any) => updateMembership(id, data),
    onSuccess: () => {
      toast.success("Membership deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting membership!");
      console.log("error deleting membership", data);
    },
  });

  return {
    membershipAddMutation,
    membershipsQuery,
    membershipDeleteMutation,
    membershipUpdateMutation,
  };
}
