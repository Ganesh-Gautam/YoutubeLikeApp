import axios from "../../api/axios";

const getChannelStats = async (channelName) => {
  const res = await axios.get(`/dashboard/stats/${channelName}`);
  return res.data.data;
};

const getChannelVideos = async (channelName, params) => {
  const res = await axios.get(`/dashboard/videos/${channelName}`, {
    params,
  });
  return res.data.data;
};

const updateChannel = async (formData) => {
  const res = await axios.patch(`/users/update-channel`, formData);
  return res.data.data;
};

export default {
  getChannelStats,
  getChannelVideos,
  updateChannel,
};
