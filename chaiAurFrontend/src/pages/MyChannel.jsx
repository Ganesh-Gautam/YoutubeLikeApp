import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyChannel() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userName) {
      navigate(`/channel/${user.userName}`);
    }
  }, [user, navigate]);

  return null;
}
