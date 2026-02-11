import API from "./api";

export const signupUser = async (formData) => {
  const res = await API.post("/auth/signup", formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await API.post("/auth/login", formData);
  return res.data;
};
