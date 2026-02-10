import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/auth/authSlice.js";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-80"
    >
      <h2 className="text-lg font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="w-full hover:bg-red-500  bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
  );
}
