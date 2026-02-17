import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch ();
    const navigate = useNavigate(); 

    return (
        <header className="flex justify-between items-center p-4 shadow">
        <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
        >
            MyTube
        </h1>
        {user && (
            <div className="flex items-center gap-3">
            <img
            src={user.user.avatar}
            alt="avatar"
            onClick={() => navigate(`/channel/${user.user.userName}`)}
            className="w-10 h-10 rounded-full cursor-pointer border"
            />
            <span onClick={() => navigate(`/channel/${user.user.userName}`)}>{user.user.userName}</span>
            <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >
                Logout
            </button>
            </div>
        )}
        </header>
    );
}
