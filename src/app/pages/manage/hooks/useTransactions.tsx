import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddTransactionDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useTransactions() {
  const queryClient = useQueryClient();

  async function getTransactions() {
    const transactions = await pb.collection("transactions").getFullList({
      sort: "-created",
      expand: "member,membership",
    });
    return transactions;
  }

  async function addTransaction(data: AddTransactionDataType) {
    const transaction = await pb.collection("transactions").create(data);
    return transaction;
  }

  async function updateTransaction(id: string, data: any) {
    delete data.id;
    const transaction = await pb.collection("transactions").update(id, data, {expand: "member,membership",});
    return transaction;
  }

  //Queries
  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  // Mutations
  const transactionAddMutation = useMutation({
    mutationKey: ["addTransaction"],
    mutationFn: addTransaction,
    onSuccess: () => {
      toast.success("Transaction created successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: ({ data }: any) => {
      toast.error("Error occured while creating transaction!");
      console.log("error creating transaction", data);
    },
  });

  const transactionUpdateMutation = useMutation({
    mutationKey: ["transactionUpdate"],
    mutationFn: ({ id, data }: any) => updateTransaction(id, data),
    onSuccess: () => {
      toast.success("Transaction updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating transaction!");
      console.log("error updating transaction", err);
    },
  });

  const transactionDeleteMutation = useMutation({
    mutationKey: ["transactionDelete"],
    mutationFn: ({ id, data }: any) => updateTransaction(id, data),
    onSuccess: () => {
      toast.success("Transaction deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting transaction!");
      console.log("error deleting transaction", data);
    },
  });

  return {
    transactionAddMutation,
    transactionsQuery,
    transactionDeleteMutation,
    transactionUpdateMutation,
  };
}
