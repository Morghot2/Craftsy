import { useParams } from 'react-router-dom';
import { services } from './Categories.utils';

// Dummy data for categories and services
const categories = [
  { id: 1, name: 'Forgery', description: 'Art of forging metals' },
  { id: 2, name: 'Blacksmithing', description: 'Crafting metal tools and objects' },
  { id: 3, name: 'Crafting', description: 'Creating handmade crafts' },
  { id: 4, name: 'Pottery', description: 'Handmade pottery items' },
  { id: 5, name: 'Woodworking', description: 'Crafting with wood' },
  { id: 6, name: 'Weaving', description: 'Art of weaving textiles' },
  { id: 7, name: 'Jewelry', description: 'Handcrafted jewelry' },
  { id: 8, name: 'Glassblowing', description: 'Creating glass art and items' },
];

// Dummy services data

// Component
export const CategoryPage = () => {
  const { name } = useParams<{ name: string }>(); // Get category name from URL params

  // Find the category matching the name
  const category = categories.find((cat) => cat.name.toLowerCase() === name?.toLowerCase());
  // Filter services by category name
  const filteredServices = services.filter((service) => service.category_name.toLowerCase() === name?.toLowerCase());

  return (
    <div className="py-10">
      {/* Category Section */}
      {category ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h1 className="font-['Rufina'] text-[32px] xl:text-[40px] text-[#224f34] font-bold mb-4">{category.name}</h1>
          <p className="font-['Poppins'] text-[18px] xl:text-[20px] text-gray-700 leading-7">{category.description}</p>
        </div>
      ) : (
        <p className="text-red-500 text-lg">Category not found. Please check the category URL.</p>
      )}

      {/* Services Section */}
      <div>
        <h2 className="font-['Rufina'] text-[28px] xl:text-[36px] text-[#224f34] font-bold mb-6">Services in {category?.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.id} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="font-['Poppins'] text-[20px] font-bold text-[#224f34] mb-2">{service.name}</h3>
                <p className="text-gray-700 text-[16px] font-['Poppins'] mb-4">{service.description}</p>
                <p className="text-gray-900 font-['Poppins'] font-semibold text-[18px] mb-4">${service.price}</p>
                <button className="w-full py-2 bg-[#224f34] text-white font-['Poppins'] text-[16px] rounded-lg hover:bg-[#1a3d28] transition-colors duration-200">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-600 font-['Poppins']">No services available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};
