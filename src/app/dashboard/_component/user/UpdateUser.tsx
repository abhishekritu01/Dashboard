import React from 'react'

// Define the shape of the user object
interface User {
  username: string
  email: string
  // Add other fields as necessary
}

interface UpdateUserProps {
  selectedUser: User
  isAdmin: boolean
  isVerified: boolean
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  updateUser: () => void
}

const UpdateUser = (
  { 
    selectedUser, 
    isAdmin, 
    isVerified, 
    setIsAdmin, 
    setIsVerified, 
    setModalVisible, 
    updateUser 
  }: UpdateUserProps
) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2">Username:</label>
          <input
            type="text"
            value={selectedUser.username}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Email:</label>
          <input
            type="email"
            value={selectedUser.email}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="mr-2"
          />
          <label>Make Admin</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
            className="mr-2"
          />
          <label>Verify User</label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={updateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setModalVisible(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
