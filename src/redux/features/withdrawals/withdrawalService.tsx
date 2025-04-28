import api from "@/utils/Https";
import { IWithdrawal } from "@/utils/Interface";

const create = async (data: IWithdrawal) => {
  const response = await api.post("/customer/withdrawal", data);
  return response.data;
};

const fetch = async () => {
  const response = await api.get("/customerwithdrawhistory");
  return response.data;
};

const fetchOne = async (id: string) => {
  const response = await api.get("customerwithdrawhistory/" + id);
  return response.data;
};

const withdrawalService = {
  create,
  fetch,
  fetchOne,
};

export default withdrawalService;
