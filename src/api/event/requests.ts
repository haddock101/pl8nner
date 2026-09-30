// requests.ts

import { CreateSupplierInput, GetSupplierInput, Supplier } from "./types"


export const useGetSupplier = () => {
 // adding <Supplier> after useFetch will give the "data" value the type Supplier.
 // This really helps to flesh out the quality of life for the API and is part
 // of creating something that is self documenting. We put Supplier because we know
 // that is what this endpoint will always return.
  const { commonFetch, isLoading, data } = useFetch<Supplier>({
    url: "http://myserver.com/api/suppliers/get",
  });

  // using typescript to define the input here means no mistakes can be
  // made downstream when actually using our API layer
  const getSupplier = (input: GetSupplierInput) => commonFetch({ input, method: "GET" });

  return { getSupplier, isLoading, data };
};

export const useCreateSupplier = () => {
  const { commonFetch, isLoading, data } = useFetch<Supplier>({
    url: "http://myserver.com/api/suppliers/create",
  });

  const createSupplier = (input: CreateSupplierInput ) => commonFetch({ input, method: "POST" });

  return { createSupplier, isLoading, data };
};
