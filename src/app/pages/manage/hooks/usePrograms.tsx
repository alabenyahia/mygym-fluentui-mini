import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddProgramDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useMemberships() {
  const queryClient = useQueryClient();

  async function getPrograms() {
    const programs = await pb.collection("programs").getFullList({
      sort: "-created",
    });
    return programs;
  }

  async function addProgram(data: AddProgramDataType) {
    const program = await pb.collection("programs").create(data);
    return program;
  }

  async function updateProgram(id: string, data: any) {
    delete data.id;
    const program = await pb.collection("programs").update(id, data);
    return program;
  }

  //Queries
  const programsQuery = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });

  // Mutations
  const programAddMutation = useMutation({
    mutationKey: ["programs"],
    mutationFn: addProgram,
    onSuccess: () => {
      toast.success("Program created successfully!");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: ({ data }: any) => {
      toast.error("Error occured while creating program!");
      console.log("error creating program", data);
    },
  });

  const programUpdateMutation = useMutation({
    mutationKey: ["programUpdate"],
    mutationFn: ({ id, data }: any) => updateProgram(id, data),
    onSuccess: () => {
      toast.success("Program updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating program!");
      console.log("error updating program", err);
    },
  });

  const programDeleteMutation = useMutation({
    mutationKey: ["programDelete"],
    mutationFn: ({ id, data }: any) => updateProgram(id, data),
    onSuccess: () => {
      toast.success("Program deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting program!");
      console.log("error deleting program", data);
    },
  });

  return {
    programAddMutation,
    programsQuery,
    programDeleteMutation,
    programUpdateMutation,
  };
}
