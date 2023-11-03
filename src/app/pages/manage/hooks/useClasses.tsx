import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddClassDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useClasses() {
  const queryClient = useQueryClient();

  async function getClasses() {
    const classes = await pb.collection("classes").getFullList({
      sort: "-created",
      expand: "program",
    });
    return classes;
  }

  async function addClasses(data: AddClassDataType) {
    const mClass = await pb.collection("classes").create(data);
    return mClass;
  }

  async function updateClasses(id: string, data: any) {
    delete data.id;
    const mClass = await pb.collection("classes").update(id, data, { expand: "program" });
    return mClass;
  }

  //Queries
  const classesQuery = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  // Mutations
  const classAddMutation = useMutation({
    mutationKey: ["classes"],
    mutationFn: addClasses,
    onSuccess: () => {
      toast.success("Class created successfully!");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: ({ data }: any) => {
      toast.error("Error occured while creating class!");
      console.log("error creating class", data);
    },
  });

  const classUpdateMutation = useMutation({
    mutationKey: ["classUpdate"],
    mutationFn: ({ id, data }: any) => updateClasses(id, data),
    onSuccess: () => {
      toast.success("Class updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating class!");
      console.log("error updating class", err);
    },
  });

  const classDeleteMutation = useMutation({
    mutationKey: ["classDelete"],
    mutationFn: ({ id, data }: any) => updateClasses(id, data),
    onSuccess: () => {
      toast.success("Class deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting class!");
      console.log("error deleting class", data);
    },
  });

  return {
    classAddMutation,
    classesQuery,
    classDeleteMutation,
    classUpdateMutation,
  };
}
