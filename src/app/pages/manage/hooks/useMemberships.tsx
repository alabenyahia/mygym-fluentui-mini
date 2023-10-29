import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddMembershipDataType } from "src/utils/types/main";
import {
  useId,
  ToastTitle,
  useToastController,
  Toast,
} from "@fluentui/react-components";


export default function useMemberships() {
  const membershipsToasterId = useId("membershipsToaster");
  const { dispatchToast } = useToastController(membershipsToasterId);
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
    mutationFn: addMembership,
    onSuccess: () => {
      dispatchToast(
        <Toast>
          <ToastTitle>Membership added successfully!</ToastTitle>
        </Toast>,
        {
          timeout: 1500,
          intent: "success",
        }
      );
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      console.log("error creating membership", data);
      dispatchToast(
        <Toast>
          <ToastTitle>Error occured!</ToastTitle>
        </Toast>,
        { timeout: 1500, intent: "error" }
      );
    },
  });

  return { membershipMutation, membershipsQuery, membershipsToasterId };
}
