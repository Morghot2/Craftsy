import { PersonIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { BecomeSeller } from './BecomeSeller';
import { ProfilePhoto } from './ProfilePhoto';
import { useUserProfile } from '@/shared/queries/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';

export const Profile = () => {
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { data: user, isLoading, error } = useUserProfile();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <p className="font-['Rufina'] text-center text-lg">Loading...</p>;
  }

  if (error) {
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

      <div className="w-full p-6">
        <h2 className="font-bold text-xl text-[#224f34] mb-4">Services</h2>
        <div className="flex flex-wrap gap-6">
          {user.services.map((service) => (
            <div key={service.id} className="flex flex-col border border-gray-300 rounded-lg w-[300px] shadow-md">
              <img src={service.thumbnail} alt={service.title} className="w-full h-36 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg text-[#224f34]">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
