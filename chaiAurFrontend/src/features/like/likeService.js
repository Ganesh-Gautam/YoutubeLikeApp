import axios from "../../api/axios";

export const ServiceToggleVideoLike = async (videoId) => {
  const res = await axios.post(`/likes/toggle/v/${videoId}`); 
  return res.data.data
};
