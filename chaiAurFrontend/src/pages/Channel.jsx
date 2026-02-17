import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import channelService from "../features/channel/channelService.js";
import ChannelVideoCard from "../components/ChannelVideoCard.jsx";

export default function Channel() {
  const { channelName } = useParams(); 

  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isOwner =
  user.user?.userName?.trim().toLowerCase() ===
  channelName?.trim().toLowerCase();
  useEffect(() => {
    fetchChannel();
  }, [channelName]);

  const fetchChannel = async () => {
    try {
      const statsRes = await channelService.getChannelStats(channelName);
      const videosRes = await channelService.getChannelVideos(channelName);

      setStats(statsRes);
      setVideos(videosRes.docs || videosRes.videos);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Channel Header */}
      <div className="relative">
        {stats.coverImage ? (
          <img
            src={stats.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-red from-gray-700 to-gray-900" />
        )}

        <div className="flex items-center gap-4 p-6">
          <img
            src={stats?.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white"
          />

          <div>
            <h1 className="text-2xl font-bold">
              {channelName}
            </h1>
            <p className="text-gray-500">
              {stats.totalVideos} videos • {stats.totalViews} views <br/> {stats.totalLikes} likes • {stats.totalComments} comments
              
            </p>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => navigate(`/channel/${channelName}/edit`)}
            className="absolute top-4 right-6 bg-yellow p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FiEdit size={20} />
          </button>
        )}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {videos.map((video) => (
          <ChannelVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
