import { apiHandler, setAuthorizationHeader } from ".";

export const getUsers = async () => {
  const res = await apiHandler.get("/users");
  return res.data;
};

export const login = async (username, password) => {
  return new Promise(async (resolve) => {
    try {
      const res = await apiHandler.post("/auth/login", { username, password });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", res.data.data.token);
      setAuthorizationHeader(res.data.data.token);
      return resolve(res.data);
    } catch (error) {
      console.log(error);
      resolve({ code: 500 });
    }
  });
};
