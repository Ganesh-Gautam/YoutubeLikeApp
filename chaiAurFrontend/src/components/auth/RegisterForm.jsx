import { useState } from "react";
import { useDispatch  } from "react-redux";
import { register } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const dispatch = useDispatch ();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Avatar is required");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("userName", form.userName);
    formData.append("password", form.password);
    formData.append("avatar", avatar);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await dispatch(register(formData)).unwrap();
      toast.success("Registered successfully");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={form.userName}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
