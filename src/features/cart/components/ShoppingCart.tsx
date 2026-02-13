import CartItem from './CartItem';
import { CartState } from '../store/cart.slice';

export default function ShoppingCart({response}: {response: CartState}) {
  const {numOfCartItems, products} = response;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
        <h2 className="text-2xl font-bold mb-1">Shopping Cart</h2>
        <p className="text-gray-500 mb-6">{numOfCartItems} {" "} {numOfCartItems === 1 ? `item` : `items`} in your cart</p>

        <div className="space-y-6">
          {products.map((product) => (
            <CartItem key={product._id} item={product} />
          ))}
        </div>
      </div>
    </>
  );
};