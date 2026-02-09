import mongoose, {isValidObjectId} from "mongoose";
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
 

const createTweet = asyncHandler(async(req,res)=>{
    const {content} = req.body;
    if(!req.user._id){
        throw new ApiError(400,"user not found")
    }
    if(!content){
        throw new ApiError(400,"Provide content of tweet ")
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    })
    if(!tweet){
        throw new ApiError(500, "Something went wrong while creating tweet ");
    }
    return res.status(201).json(
        new ApiResponse(200, tweet, "User's tweet created Successfully")
    )

})

const updateTweet =asyncHandler(async(req, res)=>{
    const {content} = req.body;
    const { tweetId } = req.params;
    
    if(!content){
        throw new ApiError(400,"content of Tweet is required")
    } 

    const tweet = await Tweet.findByIdAndUpdate({ _id: tweetId, owner: req.user._id },
        {
            $set: {
                content
            }
        },
        {new: true}
    )
    if (!tweet){
        throw new ApiError(400,"no such tweet is found")
    }
    return res.status(200)
    .json( new ApiResponse(200,tweet,"Tweet updated Successfully"))

})

const deleteTweet = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);
        const { tweetId } = req.params;

        const tweet = await Tweet.findById(tweetId)
        if(!tweet){
            throw new ApiError(404,"Tweet not found")
        }
        if (String(tweet.owner) !== String(user._id)) {
            throw new ApiError(403, "Unauthorized access");
        }
        await Tweet.findByIdAndDelete(tweetId);
        res.status(200).json(200,{},"Tweet deleted succesfully")

    } catch(error){
        throw new ApiError(500,"Server Error")
    }
}) 

const getUserTweets = asyncHandler(async(req,res)=>{
    try {
        const tweets = await Tweet.find({ "owner": req.user._id });
        return res.status(200).json(
            new ApiResponse(200, tweets, "User's tweet fetched Successfully")
    )
    } catch (error) {
        throw new ApiError(403,"Invalid Request")
    }
})


export {
    createTweet, getUserTweets, updateTweet, deleteTweet
}