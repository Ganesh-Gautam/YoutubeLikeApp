import { useState } from "react";
import { useSelector } from "react-redux";
import channelService from "../features/channel/channelService";

export default function EditChannel() {
  const { user } = useSelector((state) => state.auth);

  const [accountData, setAccountData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await channelService.updateAccountDetails(accountData);
      alert("Account updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating account");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = async () => {
    if (!avatarFile) return alert("Select avatar first");

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      setLoading(true);
      await channelService.updateAvatar(formData);
      alert("Avatar updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverUpdate = async () => {
    if (!coverFile) return alert("Select cover image first");

    const formData = new FormData();
    formData.append("coverImage", coverFile);

    try {
      setLoading(true);
      await channelService.updateCoverImage(formData);
      alert("Cover updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating cover");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await channelService.changePassword(passwordData);
      alert("Password changed successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Edit Channel</h1>

      {/* Account */}
      <form onSubmit={handleAccountUpdate} className="space-y-4 border p-6 rounded-xl">
        <h2 className="text-xl font-semibold">Account Details</h2>
        fullName
        <input
          type="text"
          value={accountData.fullName}
          onChange={(e) =>
            setAccountData({ ...accountData, fullName: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          value={accountData.email}
          onChange={(e) =>
            setAccountData({ ...accountData, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Updating..." : "Update Account"}
        </button>
      </form>

      {/* Avatar */}
      <div className="space-y-4 border p-6 rounded-xl">
        <h2 className="text-xl font-semibold">Update Avatar</h2>
        <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
        <button
          onClick={handleAvatarUpdate}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Update Avatar"}
        </button>
      </div>

      {/* Cover */}
      <div className="space-y-4 border p-6 rounded-xl">
        <h2 className="text-xl font-semibold">Update Cover</h2>
        <input type="file" onChange={(e) => setCoverFile(e.target.files[0])} />
        <button
          onClick={handleCoverUpdate}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Update Cover"}
        </button>
      </div>

      {/* Password */}
      <form onSubmit={handlePasswordChange} className="space-y-4 border p-6 rounded-xl">
        <h2 className="text-xl font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
