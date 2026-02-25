import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import videoService from "./videoService.js";
import { ServiceToggleVideoLike } from "../like/likeService.js";

const initialState = {
    videos:[],
    currentVideo : null,
    isLiked : false,
    likeCount: 0,
    pagination : null,
    isLoading : false,
    isError : false,
    message :""
}

export const fetchVideos = createAsyncThunk(
    "video/fetchAll", async(params, thunkAPI)=>{
        try {
            return await videoService.getAllVideos(params);
        } catch (error){
            return thunkAPI.rejectWithValue(error.respose?.data?.message);
        }
    }
)

export const fetchVideoById = createAsyncThunk(
    "video/fetchById",
    async (videoId, thunkAPI) => {
        try {
        return await videoService.getVideoById(videoId);
        } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);
export const toggleVideoLike = createAsyncThunk( 
    "video/toggleLike", 
    async (videoId, thunkAPI) => { 
        try { 
            return await ServiceToggleVideoLike(videoId); 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message); 
        } 
    } 
);

export const uploadVideo = createAsyncThunk(
    "video/upload",
    async (formData, thunkAPI) => {
        try {
            return await videoService.publishVideo(formData);
        } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchVideos.pending,(state)=>{
            state.isLoading =true;
        })
        .addCase(fetchVideos.fulfilled, (state ,action)=>{
            state.isLoading = false;
            state.videos = action.payload.videos;
            state.pagination = action.payload.pagination;
        })
        .addCase(fetchVideos.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(fetchVideoById.fulfilled, (state, action) => {
            state.currentVideo = action.payload;
        })
        .addCase(toggleVideoLike.fulfilled, (state, action) => {
            state.isLoading = false;
            if (state.currentVideo) {
                state.currentVideo.isLiked = action.payload.liked;
                state.currentVideo.likeCount  += action.payload.liked ? 1 : -1;
            }
        })
        .addCase(uploadVideo.fulfilled, (state, action) => {
            state.videos.unshift(action.payload);
        });
    }
});

export default videoSlice.reducer;