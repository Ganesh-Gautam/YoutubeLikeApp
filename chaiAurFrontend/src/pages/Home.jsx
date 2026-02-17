import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchVideos } from "../features/video/videoSlice";
import VideoCard from "../components/VideoCard.jsx";
import VideoCardSkeleton from "../components/VideoCardSkeleton.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const {videos, isLoading } =useSelector((state)=>state.video);

  useEffect(()=>{
    dispatch(fetchVideos());
  },[dispatch]);

  return (
    <div>
      <Link to="/upload">
        <button className="w-full hover:bg-amber-300 bg-blue-300 text-white p-2" >Add Video</button>
      </Link>
      {
        isLoading
          ? (Array.from({ length: 8 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            )))
          : (Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <h1>There are no videos yet</h1>
        ))
      }
      
    </div>
);

};

export default Home;
