import axios from "../../api/axios";

export const getVideoComments = (videoId, page = 1, limit = 10) => {
  return axios.get(`/comments/video/${videoId}`, {
    params: { page, limit },
  });
};

export const addComment = (videoId, data) => {
  return axios.post(`/comments/video/${videoId}`, data);
};

export const updateComment = (data) => {
  const {commentId , content} = data;
  return axios.patch(`/comments/c/${commentId}`, {
    content,
  });
  
};

export const deleteComment = (commentId) => {
  return axios.delete(`/comments/c/${commentId}`);
};

