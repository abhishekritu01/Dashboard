import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "../Loadder";
import UpdateUser from "./UpdateUser";

// Define the type for the User
interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]); // Array of User objects
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // User or null
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/user/getusers");
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
      toast.error("Failed to fetch users");
    }
  };

  // Open the modal for updating user
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsAdmin(user.isAdmin);
    setIsVerified(user.isVerified);
    setModalVisible(true);
  };

  // Update user function
  const updateUser = async () => {
    if (!selectedUser) return; // Prevent update if no user is selected
    try {
      const res = await axios.put(`/api/user/updateuser/${selectedUser._id}`, {
        updateFields: { isAdmin, isVerified },
      });

      toast.success(res.data.message || "User updated successfully");

      // Close the modal and refresh user list after update
      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
        toast.error(error.response?.data?.message || "Failed to update user");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Failed to update user");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 border border-gray-700">#</th>
                <th className="p-2 border border-gray-700">Name</th>
                <th className="p-2 border border-gray-700">Email</th>
                <th className="p-2 border border-gray-700">Verified</th>
                <th className="p-2 border border-gray-700">Admin</th>
                <th className="p-2 border border-gray-700 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-700">
                  <td className="p-2 border border-gray-700">{index + 1}</td>
                  <td className="p-2 border border-gray-700">
                    <Link href={`/profile/${user._id}`} className="font-bold text-blue-400 hover:underline">
                      {user?.username}
                    </Link>
                  </td>
                  <td className="p-2 border border-gray-700">{user.email}</td>
                  <td className="p-2 border border-gray-700">{user.isVerified ? "Yes" : "No"}</td>
                  <td className="p-2 border border-gray-700">{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="p-2 border border-gray-700 text-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex items-center justify-center px-2 py-1 text-blue-500 hover:text-blue-300"
                    >
                      <AiOutlineEdit className="mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for updating user */}
      {modalVisible && selectedUser && (
        <UpdateUser
          selectedUser={selectedUser}
          isAdmin={isAdmin}
          isVerified={isVerified}
          setIsAdmin={setIsAdmin}
          setIsVerified={setIsVerified}
          updateUser={updateUser}
          setModalVisible={setModalVisible}
        />
      )}
    </div>
  );
};

export default UserList;
