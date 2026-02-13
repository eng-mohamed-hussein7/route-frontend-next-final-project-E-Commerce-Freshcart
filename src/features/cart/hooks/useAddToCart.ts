import { addProductToCart } from "@/features/cart/server/cart.action";

export async function handleAddToCart(productId: string) {
    const response = await addProductToCart({productId})
    console.log(response)
}