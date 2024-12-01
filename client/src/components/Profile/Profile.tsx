import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { SellerInfo } from './SellerInfo';
import { ServicesList } from './ServicesList';
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
        <UserInfo user={user} onEditProfile={() => setIsSellerModalOpen(true)} onEditPhoto={() => setIsPhotoModalOpen(true)} />
        {user.isSeller && <SellerInfo user={user} />}
      </div>
      <div className="border-t w-full border-gray-300 my-8"></div>

      {/* View My Purchases Button */}
      <div className="w-full text-center mb-6">
        <Link to="/purchases" className="py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          View My Purchases
        </Link>
      </div>

      {/* Services Section */}
      {user.isSeller && <ServicesList services={user.services} onAddService={() => setIsAddServiceModalOpen(true)} />}

      {/* Modals */}
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
