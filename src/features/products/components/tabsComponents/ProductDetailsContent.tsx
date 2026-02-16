import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faStar as faStarSolid,
  faTruck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  { id: "details", label: "Product Details", icon: faBox },
  { id: "reviews", label: "Reviews (4)", icon: faStarSolid },
  { id: "shipping", label: "Shipping & Returns", icon: faTruck },
];

export default function ProductDetailsContent({
  description,
  categoryName,
  brandName,
  sold,
  subcategoryName,
}: {
  description: string;
  categoryName: string;
  brandName: string;
  sold: number;
  subcategoryName: string;
}) {
  const features = [
    "Premium Quality Product",
    "100% Authentic Guarantee",
    "Fast & Secure Packaging",
    "Quality Tested",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          About this Product
        </h3>
        <p className="text-gray-600 leading-relaxed">
         {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Product Information
          </h4>
          <ul className="space-y-2">
              <li key={categoryName} className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-900 font-medium">{categoryName}</span>
              </li>
              <li key={subcategoryName} className="flex justify-between text-sm">
                <span className="text-gray-500">Subcategory</span>
                <span className="text-gray-900 font-medium">{subcategoryName}</span>
              </li>
              <li key={brandName} className="flex justify-between text-sm">
                <span className="text-gray-500">Brand</span>
                <span className="text-gray-900 font-medium">{brandName}</span>
              </li>
              <li key={sold} className="flex justify-between text-sm">
                <span className="text-gray-500">Items Sold</span>
                <span className="text-gray-900 font-medium">{sold}+ sold</span>
              </li>
           
          </ul>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center text-sm text-gray-600"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-primary-600 mr-2 w-4"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
