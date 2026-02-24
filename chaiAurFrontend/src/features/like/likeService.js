import axios from "../../api/axios";

export const toggleVideoLike = (videoId) => {
  return axios.post(`/likes/toggle/v/${videoId}`);
};
