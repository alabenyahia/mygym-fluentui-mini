import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddCoachDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useCoaches() {
  const queryClient = useQueryClient();

  async function getCoaches() {
    const coaches = await pb.collection("coaches").getFullList({
      sort: "-created",
      expand: "program"
    });
    return coaches;
  }

  async function addCoach(data: AddCoachDataType) {
    const coach = await pb.collection("coaches").create(data);
    return coach;
  }

  async function updateCoach(id: string, data: any) {
    console.log("data from updatefn", data)
    delete data.id;
    const coach = await pb
      .collection("coaches")
      .update(id, data, { expand: "program" });
    return coach;
  }

  //Queries
  const coachesQuery = useQuery({ queryKey: ["coaches"], queryFn: getCoaches });

  // Mutations
  const coachAddMutation = useMutation({
    mutationKey: ["coachAdd"],
    mutationFn: addCoach,
    onSuccess: () => {
      toast.success("Coach created successfully!");
      queryClient.invalidateQueries({ queryKey: ["coaches"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while creating coach!");
      console.log("error creating coach", data);
    },
  });

  const coachUpdateMutation = useMutation({
    mutationKey: ["gymStaffUpdate"],
    mutationFn: ({ id, data }: any) => updateCoach(id, data),
    onSuccess: () => {
      toast.success("Coach updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["coaches"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating coach!");
      console.log("error updating coach", err);
    },
  });

  const coachDeleteMutation = useMutation({
    mutationKey: ["gymStaffDelete"],
    mutationFn: ({ id, data }: any) => updateCoach(id, data),
    onSuccess: () => {
      toast.success("Coach deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["coaches"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting coach!");
      console.log("error deleting coach", data);
    },
  });

  return {
    coachAddMutation,
    coachesQuery,
    coachUpdateMutation,
    coachDeleteMutation,
  };
}
