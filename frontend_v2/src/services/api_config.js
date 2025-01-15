import axios from "axios";
import { server_Url } from "./constants";

export const serverApiConfig = async ({ apiEndPoint, apiMethod, data }) => {
  try {
    const response = await axios({
      method: apiMethod,
      baseURL: server_Url,
      url: apiEndPoint,
      data: data,
    });
    return response;
  } catch (error) {
    return error;
  }
};
