import { PersonIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { BecomeSeller } from './BecomeSeller';
import { ProfilePhoto } from './ProfilePhoto';

const user = {
  email: 'user@example.com',
  password: '******',
  is_seller: true,
  bio: 'I am a passionate artisan who loves creating unique handmade items.',
  country: 'USA',
  photo: '',
  name: '123illuvatar',
  services: [
    {
      id: 1,
      title: 'Custom Handmade Jewelry',
      thumbnail: 'https://via.placeholder.com/300x150',
      description: 'Beautifully crafted jewelry made to order.',
    },
    {
      id: 2,
      title: 'Personalized Wooden Crafts',
      thumbnail: 'https://via.placeholder.com/300x150',
      description: 'Unique wooden items with custom engraving.',
    },
  ],
};

export const Profile = () => {
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(user.photo);

  return (
    <div className="flex flex-col w-100 min-h-screen px-6 py-10">
      <div className="bg-white rounded-lg w-full shadow-md p-6 flex items-center">
        <div
          className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100"
          onClick={() => setIsPhotoModalOpen(true)}
        >
          {uploadedPhoto ? (
            <img src={uploadedPhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <PersonIcon className="text-gray-500 w-12 h-12" />
          )}
        </div>
        <div>
          <h1 className="font-bold text-2xl text-[#224f34]">{user.name}</h1>
          <p className="text-gray-600">@{user.name.toLowerCase()}</p>
          <p className="text-gray-600 mt-2">Email: {user.email}</p>
          <button onClick={() => setIsSellerModalOpen(true)} className="mt-4 py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28]">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="border-t w-full border-gray-300 my-8"></div>
      <div className="w-full p-6">
        <h2 className="font-bold text-xl text-[#224f34] mb-4">Services</h2>
        <div className="flex flex-wrap gap-6">
          {user.services.map((service) => (
            <div key={service.id} className="flex flex-col border border-gray-300 rounded-lg w-[300px]">
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
        }}
      />
      <ProfilePhoto isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} onPhotoUpload={setUploadedPhoto} />
    </div>
  );
};
