import api from "@/utils/Https";
import { ICustomer } from "@/app/Profile/interface";

// get user profile
const fetch = async () => {
  const response = await api.get("");
  return response.data;
};

// update user profile
const update = async (data: ICustomer) => {
  const response = await api.post("customer/update", data);
  return response.data;
};

// update customer profile picture
const updatePicture = async (data: { file: File }) => {
  const response = await api.post("/customer/updatepics", data);
  return response.data;
};

const profileService = {
  fetch,
  update,
  updatePicture,
};

export default profileService;
