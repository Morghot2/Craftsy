export const SellerInfo = ({ user }) => (
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
);
