import ProductDetailsTabs from "../components/ProductDetails/ProductDetailsTabs"
import ProductInfo from "../components/ProductDetails/ProductInfo"
import RelatedProducts from "../components/ProductDetails/RelatedProducts"
import { getProductsByCategory, getSingleProduct } from "../server/products.actions"


export default async function ProductDetailsScreen({productId }: {productId: string}) {
  const response = await getSingleProduct({productId})
  const relatedProductsResponse = await getProductsByCategory({category: response.data.category._id})
  // console.log(response.data.subcategory[0].name)
  return (
    <>
      <ProductInfo info={response.data}/>
      <ProductDetailsTabs info={response.data}/>
      <RelatedProducts relatedProductsResponse={relatedProductsResponse}/>
    </>
  )
}
