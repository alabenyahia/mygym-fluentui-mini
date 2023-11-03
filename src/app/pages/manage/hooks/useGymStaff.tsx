import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddGymStaffDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useGymStaff() {
  const queryClient = useQueryClient();

  async function getGymStaff() {
    const gymstaff = await pb.collection("gymstaff").getFullList({
      sort: "-created",
    });
    return gymstaff;
  }

  async function addGymStaff(data: AddGymStaffDataType) {
    const gymstaff = await pb.collection("gymstaff").create(data);
    return gymstaff;
  }

  async function updateGymStaff(id: string, data: any) {
    console.log("data from updatefn", data)
    delete data.id;
    const gymstaff = await pb
      .collection("gymstaff")
      .update(id, data);
    return gymstaff;
  }

  //Queries
  const gymStaffQuery = useQuery({ queryKey: ["gymstaff"], queryFn: getGymStaff });

  // Mutations
  const gymStaffAddMutation = useMutation({
    mutationKey: ["gymStaffAdd"],
    mutationFn: addGymStaff,
    onSuccess: () => {
      toast.success("Gym staff created successfully!");
      queryClient.invalidateQueries({ queryKey: ["gymstaff"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while creating gym staff!");
      console.log("error creating gym staff", data);
    },
  });

  const gymStaffUpdateMutation = useMutation({
    mutationKey: ["gymStaffUpdate"],
    mutationFn: ({ id, data }: any) => updateGymStaff(id, data),
    onSuccess: () => {
      toast.success("Gym staff updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["gymstaff"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating gym staff!");
      console.log("error updating gym staff", err);
    },
  });

  const gymStaffDeleteMutation = useMutation({
    mutationKey: ["gymStaffDelete"],
    mutationFn: ({ id, data }: any) => updateGymStaff(id, data),
    onSuccess: () => {
      toast.success("Gym staff deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["gymstaff"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting gym staff!");
      console.log("error deleting gym staff", data);
    },
  });

  return {
    gymStaffAddMutation,
    gymStaffQuery,
    gymStaffUpdateMutation,
    gymStaffDeleteMutation,
  };
}
