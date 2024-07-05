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
