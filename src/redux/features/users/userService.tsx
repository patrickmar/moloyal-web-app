import api from "@/utils/Https";

// get users
const fetchAll = async () => {
  const response = await api.get("/api/users/all");
  return response.data;
};

const userService = {
  fetchAll,
};

export default userService;
