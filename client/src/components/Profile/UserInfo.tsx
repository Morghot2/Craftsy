import { PersonIcon } from '@radix-ui/react-icons';

export const UserInfo = ({ user, onEditProfile, onEditPhoto }) => (
  <div className="flex-1 md:border-r md:border-gray-300 md:pr-4">
    <div className="flex flex-col items-center text-gray-700 space-y-4">
      <div
        className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100"
        onClick={onEditPhoto}
      >
        {user.profilePhoto ? (
          <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <PersonIcon className="text-gray-500 w-16 h-16" />
        )}
      </div>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm w-full">
        <strong className="block text-sm text-gray-500 uppercase">Username</strong>
        <p className="text-lg text-center">{user.username}</p>
      </div>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm w-full">
        <strong className="block text-sm text-gray-500 uppercase">Email</strong>
        <p className="text-lg text-center">{user.email}</p>
      </div>
      <button onClick={onEditProfile} className="mt-4 py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28] block">
        {user.isSeller ? 'Edit Profile' : 'Become a Seller!'}
      </button>
    </div>
  </div>
);
