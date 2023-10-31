import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddMembershipDataType } from "src/utils/types/main";


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

  //Queries
  const membershipsQuery = useQuery({
    queryKey: ["memberships"],
    queryFn: getMemberships,
  });

  // Mutations
  const membershipMutation = useMutation({
    mutationKey: ["memberships"],
    mutationFn: addMembership,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      console.log("error creating membership", data);
      
    },
  });

  return { membershipMutation, membershipsQuery };
}
