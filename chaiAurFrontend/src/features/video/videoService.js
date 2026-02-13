import axios from "../../api/axios.js";

const publishVideo = async(formData)=>{
    const res = await axios.post("/videos/upload",formData);
    return  res.data.data;
}

const getAllVideos = async (params) => {
    const res = await axios.get("/videos", { params });
    return res.data.data;
};

const getVideoById = async (videoId) => {
    const res = await axios.get(`/videos/${videoId}`);
    return res.data.data;
};

export default {
    publishVideo,
    getAllVideos,
    getVideoById,
};