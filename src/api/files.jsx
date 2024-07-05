import { apiHandler } from ".";

export const getMyFiles = async () => {
  return new Promise(async (resolve) => {
    try {
      const res = await apiHandler.get("/files/me");
      console.log(res.data);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      resolve([]);
    }
  });
};

export const uploadFile = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiHandler.post("/files/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error?.response?.data?.error);
    }
  });
};

export const deleteFile = async (fileId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiHandler.delete(`/files/${fileId}`);
      console.log(res.data);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const getUsersListWithAccess = async (fileId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiHandler.get(`/files/${fileId}/users`);
      console.log(res.data);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const gaveAccess = async (fileId, userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiHandler.put(`/files/${fileId}/${userId}`, data);
      console.log(res.data);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
