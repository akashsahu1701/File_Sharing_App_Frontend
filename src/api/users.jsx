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
      localStorage.setItem("user_id", res.data.data.user.id);
      localStorage.setItem("role", res.data.data.user.roles);
      setAuthorizationHeader(res.data.data.token);
      return resolve(res.data);
    } catch (error) {
      console.log(error);
      resolve({ code: 500 });
    }
  });
};

export const fetchUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiHandler.get("/users/");
      console.log(res.data);
      return resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const updateSettings = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiHandler.put(`/users/settings`, data);
      console.log(res.data);
      return resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiHandler.post(`/users/`, data);
      console.log(res.data);
      return resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
