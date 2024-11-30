import { PersonIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { BecomeSeller } from './BecomeSeller';
import { ProfilePhoto } from './ProfilePhoto';
import { AddServiceModal } from './AddService';
import { useUserProfile } from '@/shared/queries/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';

export const Profile = () => {
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const { data: user, isLoading, error } = useUserProfile();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <p className="font-['Rufina'] text-center text-lg">Loading...</p>;
  }

  if (error || !user) {
    return <p className="font-['Rufina'] text-center text-lg text-red-500">Error loading profile. Please try again later.</p>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen px-6 py-10 font-['Rufina']">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1 md:border-r md:border-gray-300 md:pr-4">
          <div className="flex flex-col items-center text-gray-700 space-y-4">
            <div
              className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100"
              onClick={() => setIsPhotoModalOpen(true)}
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
            <button onClick={() => setIsSellerModalOpen(true)} className="mt-4 py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28] block">
              {user.isSeller ? 'Edit Profile' : 'Become a Seller!'}
            </button>
          </div>
        </div>

        {user.isSeller && (
          <div className="flex-1">
            <h2 className="font-bold text-xl text-[#224f34] mb-4 border-b border-gray-300 pb-2">Seller Information</h2>
            <div className="space-y-4 text-gray-700">
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <strong className="block text-sm text-gray-500 uppercase">Name</strong>
                <p className="text-lg">
                  {user.name} {user.surname}
                </p>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <strong className="block text-sm text-gray-500 uppercase">Bio</strong>
                <p className="text-lg break-words">{user.bio}</p>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <strong className="block text-sm text-gray-500 uppercase">Country</strong>
                <p className="text-lg">{user.country}</p>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <strong className="block text-sm text-gray-500 uppercase">Phone</strong>
                <p className="text-lg">{user.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t w-full border-gray-300 my-8"></div>

      {user.isSeller && (
        <div className="w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-[#224f34]">Services</h2>
            <button onClick={() => setIsAddServiceModalOpen(true)} className="py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28]">
              Add a Service
            </button>
          </div>
          <div className="flex flex-wrap gap-6">
            {user.services && user.services.length > 0 ? (
              user.services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col border border-gray-300 rounded-lg w-[300px] shadow-md overflow-hidden"
                  style={{ height: '400px' }}
                >
                  <div className="w-full h-[200px] overflow-hidden bg-gray-100">
                    <img src={service.thumbnail || service.photo_url} alt={service.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 bg-white flex flex-col items-center justify-between h-[calc(400px-200px)]">
                    <h3 className="font-bold text-lg text-[#224f34]">{service.name}</h3>
                    <p className="text-gray-600 mt-2 text-center flex-grow">{service.description}</p>
                    <p className="text-[#224f34] font-semibold text-md mt-4 text-center">${service.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">You have no services listed. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      <BecomeSeller
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        defaultValues={{
          bio: user.bio,
          country: user.country,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
        }}
        onSave={(updatedData) => {
          queryClient.setQueryData(['userProfile'], (oldData) => ({
            ...oldData,
            ...updatedData,
          }));
        }}
      />

      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => {
          setIsAddServiceModalOpen(false);
          queryClient.invalidateQueries(['userProfile']);
        }}
      />

      <ProfilePhoto
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPhotoUpload={(photoUrl) => {
          queryClient.setQueryData(['userProfile'], (oldData) => ({
            ...oldData,
            profilePhoto: photoUrl,
          }));
        }}
      />
    </div>
  );
};
