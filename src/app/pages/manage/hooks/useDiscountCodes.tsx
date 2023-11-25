import pb from "src/utils/db/pocketbase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddDiscountCodeDataType } from "src/utils/types/main";
import toast from "react-hot-toast";

export default function useDiscountCodes() {
  const queryClient = useQueryClient();

  async function getDiscountCodes() {
    const discountCodes = await pb.collection("discountcodes").getFullList({
      sort: "-created",
    });
    return discountCodes;
  }

  async function getValidDiscountCodes() {
    const discountCodes = await pb.collection("discountcodes").getFullList({
      filter: `((validFrom <= "${new Date().toString()}" || validFrom = "") && (validUntil >= "${new Date().toString()}" || validUntil = "")) `,
    });
    return discountCodes;
  }

  async function addDiscountCode(data: AddDiscountCodeDataType) {
    const discountCode = await pb.collection("discountcodes").create(data);
    return discountCode;
  }

  async function updateDiscountCode(id: string, data: any) {
    console.log("data from updatefn", data);
    delete data.id;
    const discountCode = await pb.collection("discountcodes").update(id, data);
    return discountCode;
  }

  //Queries
  const discountCodesQuery = useQuery({
    queryKey: ["discountcodes"],
    queryFn: getDiscountCodes,
  });

  const validDiscountCodesQuery = useQuery({
    queryKey: ["validdiscountcodes"],
    queryFn: getValidDiscountCodes,
  });

  // Mutations
  const discountCodeAddMutation = useMutation({
    mutationKey: ["discountCodeAdd"],
    mutationFn: addDiscountCode,
    onSuccess: () => {
      toast.success("Discount code created successfully!");
      queryClient.invalidateQueries({ queryKey: ["discountcodes"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while creating Discount code!");
      console.log("error creating Discount code", data);
    },
  });

  const discountCodeUpdateMutation = useMutation({
    mutationKey: ["discountCodeUpdate"],
    mutationFn: ({ id, data }: any) => updateDiscountCode(id, data),
    onSuccess: () => {
      toast.success("Discount code updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["discountcodes"] });
    },
    onError: (err: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while updating Discount code!");
      console.log("error updating Discount code", err);
    },
  });

  const discountCodeDeleteMutation = useMutation({
    mutationKey: ["discountCodeDelete"],
    mutationFn: ({ id, data }: any) => updateDiscountCode(id, data),
    onSuccess: () => {
      toast.success("Discount code deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["discountcodes"] });
    },
    onError: ({ data }: any) => {
      //const { data: errorData }: any = data;
      toast.error("Error occured while deleting Discount code!");
      console.log("error deleting Discount code", data);
    },
  });

  return {
    discountCodeAddMutation,
    discountCodesQuery,
    discountCodeUpdateMutation,
    discountCodeDeleteMutation,
    validDiscountCodesQuery,
  };
}
