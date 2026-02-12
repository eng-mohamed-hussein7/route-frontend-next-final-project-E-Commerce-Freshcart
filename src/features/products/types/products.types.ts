export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: ProductCategory;
  brand: ProductBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ProductsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface ProductsResponse {
  results: number;
  metadata: ProductsMetadata;
  data: Product[];
}

export interface SingleProductResponse {
    data: Product;
}