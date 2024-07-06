import axios from "axios";
export const baseUrl = "http://13.233.125.8:8082/api";

export const apiHandler = axios.create({
  baseURL: baseUrl,
});

export const setAuthorizationHeader = (token) => {
  if (!token) {
    delete apiHandler.defaults.headers.common["Authorization"];
    return;
  }
  apiHandler.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
