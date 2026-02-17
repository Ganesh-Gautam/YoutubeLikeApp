import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const formatDuration = (duration) => {
  if (!duration || isNaN(duration)) return "0:00"; 
  const minutes = Math.floor(duration / 60); 
  const seconds = Math.floor(duration % 60); 
  return `${minutes}:${seconds.toString().padStart(2, "0")}`; 
};

export default function ChannelVideoCard({ video }) {
  return (
    <div>
      <Link to={`/watch/${video._id}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded"
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </span>

      </Link>

      <div className="flex gap-3 mt-3">
       
        <div>
          <Link to={`/watch/${video._id}`}>
            <h3 className="font-semibold line-clamp-2">
              {video.title}
            </h3>
          </Link>

        
          <p className="text-sm text-gray-500">
            {video.views} views •{" "}
            {formatDistanceToNow(new Date(video.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

