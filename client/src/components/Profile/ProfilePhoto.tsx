import { ProfilePhotoProps } from './Profile.utils';
export const ProfilePhoto = ({ isOpen, onClose, onPhotoUpload }: ProfilePhotoProps) => {
  if (!isOpen) return null;

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onPhotoUpload(reader.result);
      reader.readAsDataURL(file);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="font-bold text-2xl text-[#224f34] mb-4">Upload Photo</h2>
        <div
          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer"
          onClick={() => document.getElementById('photo-upload').click()}
        >
          <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          <p className="text-gray-500">Click to Upload</p>
        </div>
        <button onClick={onClose} className="mt-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  );
};
