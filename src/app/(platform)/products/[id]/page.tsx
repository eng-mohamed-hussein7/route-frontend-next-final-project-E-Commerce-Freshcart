import ProductDetailsScreen from "@/features/products/screens/product-details.screens";

type ProductDetailsProps = {
    params: Promise<{id: string}>
    
}

export default async function ProductDetails({params}: ProductDetailsProps) {
    const { id } = await params;
  return (
    <ProductDetailsScreen productId={id}/>
  )
}
