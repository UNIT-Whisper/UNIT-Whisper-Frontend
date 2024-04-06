import axios from "axios";
// 이거 맞나..? 
const BASE_URL = import.meta.env.VITE_SERVER_URL;
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const sendCloud = async (
    token : string,
    content : string,
    latitude : number,
    longitude : number,
  ) => {
    try {
      const response = await axiosInstance.post(`/whisper`, {
        content : content,
        latitude : latitude,
        longitude : longitude,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const result = error.response;
        if (result?.status === 401) {
          const errorMessage = result?.data?.detail;
          return errorMessage;
        } else if (result?.status === 413) {
          return false;
        }
      } else {
        return false;
      }
    }
  };