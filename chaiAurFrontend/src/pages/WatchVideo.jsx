import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoById } from "../features/video/videoSlice";

export default function WatchVideo() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { currentVideo } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchVideoById(videoId));
  }, [dispatch, videoId]);

  if (!currentVideo) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <video
        src={currentVideo.videoFile}
        controls
        className="w-full rounded"
      />

      <h2 className="text-xl font-semibold mt-4">
        {currentVideo.title}
      </h2>

      <p className="text-gray-500">
        {currentVideo.views} views
      </p>

      <p className="mt-3">{currentVideo.description}</p>
    </div>
  );
}
