import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddMemberDataType } from "src/utils/types/main";
import {
  useId,
  ToastTitle,
  useToastController,
  Toast,
} from "@fluentui/react-components";

export default function useMembers() {
  const membersToasterId = useId("membersToaster");
  const { dispatchToast } = useToastController(membersToasterId);
  const queryClient = useQueryClient();

  async function getMembers() {
    const members = await pb.collection("members").getFullList({
      sort: "-created",
    });
    return members;
  }

  async function addMember(data: AddMemberDataType) {
    const member = await pb.collection("members").create(data);
    return member;
  }

  //Queries
  const membersQuery = useQuery({ queryKey: ["members"], queryFn: getMembers });

  // Mutations
  const memberMutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      dispatchToast(
        <Toast>
          <ToastTitle>Member added successfully!</ToastTitle>
        </Toast>,
        {
          timeout: 1500,
          intent: "success",
        }
      );
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      console.log("error creating member", data);
      dispatchToast(
        <Toast>
          <ToastTitle>Error occured!</ToastTitle>
        </Toast>,
        { timeout: 1500, intent: "error" }
      );
    },
  });

  return { memberMutation, membersQuery, membersToasterId };
}
