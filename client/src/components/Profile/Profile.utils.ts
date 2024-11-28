export interface BecomeSellerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: {
    bio: string;
    country: string;
  };
}

export interface ProfilePhotoProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUpload: (photo: string | ArrayBuffer | null) => void;
}
