import api from "@/utils/Https";
import { ISavings } from "@/utils/Interface";

const create = async (data: ISavings) => {
  const response = await api.post("/customer/savings", data);
  return response.data;
};

const fetch = async () => {
  const response = await api.get("/customersavingshistory");
  return response.data;
};

const fetchOne = async (id: string) => {
  const response = await api.get("customersavingshistory/" + id);
  return response.data;
};

// const update = async (id, data) => {
//     const response = await api.put('/api/posts/'+id, data);
//     return response.data;
// }

// const remove = async (id) => {=
//     const response = await api.delete('/api/posts/'+id);
//     return response.data;
// }

const savingsService = {
  create,
  fetch,
  fetchOne,
};

export default savingsService;
