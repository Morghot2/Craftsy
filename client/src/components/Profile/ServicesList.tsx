import React, { useState } from 'react';
import { useDeleteService } from '@/shared/queries/useService';
import { useQueryClient } from '@tanstack/react-query';

export const ServicesList = ({ services, onAddService }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteService } = useDeleteService();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleDelete = () => {
    if (selectedServiceId) {
      deleteService(selectedServiceId, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userProfile']);
          setIsConfirmModalOpen(false);
          setSelectedServiceId(null);
        },
      });
    }
  };

  const openConfirmModal = (id) => {
    setSelectedServiceId(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedServiceId(null);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-[#224f34]">Services</h2>
        <button onClick={onAddService} className="py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28]">
          Add a Service
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-start">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col border border-gray-300 rounded-lg shadow-md w-full sm:w-[300px] overflow-hidden"
              style={{ maxHeight: '400px' }}
            >
              <div className="w-full h-[200px] overflow-hidden bg-gray-100">
                <img src={service.photo_url} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 bg-white flex flex-col items-center justify-between flex-grow">
                <h3 className="font-bold text-lg text-[#224f34]">{service.name}</h3>
                <p className="text-gray-600 mt-2 text-center flex-grow">{service.description}</p>
                <p className="text-[#224f34] font-semibold text-md mt-4 text-center">${service.price}</p>
                <button onClick={() => openConfirmModal(service.id)} className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You have no services listed. Add one to get started!</p>
        )}
      </div>
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="font-bold text-lg text-[#224f34] mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-6">Do you really want to delete this service?</p>
            <div className="flex justify-end gap-4">
              <button onClick={closeConfirmModal} className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleDelete} className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
