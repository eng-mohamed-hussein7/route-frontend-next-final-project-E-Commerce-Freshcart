import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    
export default function CouponSection() {
  return (
    <div className="pt-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
        <h4 className="font-semibold mb-3">Apply Coupon</h4>
        <div className="flex gap-2 mb-3">
          <input 
            type="text" 
            placeholder="Enter coupon code" 
            className="flex-1 border border-gray-200 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700">
            Apply
          </button>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-md flex items-center gap-2 border border-green-100">
          <FontAwesomeIcon icon={faTag} className='text-green-600'/>
          <span className="text-md text-gray-800 font-medium">FRESH20 Applied</span>
          <span className="ml-auto font-bold text-green-500">-$3.25</span>
        </div>
      </div>    
    </div>    
  )
}