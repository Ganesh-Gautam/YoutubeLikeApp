import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

export default function Header() {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <header className="flex justify-between items-center p-4 shadow">
        <h1 className="text-xl font-bold">Video App</h1>

        {user && (
            <div className="flex items-center gap-3">
            <span>{user.username}</span>
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
