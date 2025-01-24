export type SidebarLinkTypes = {
  name: string;
  href: string;
};


export type ProductType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
}


export type CartProductsResponseType = {
  id: number;
  products: ProductType[]
}

export type ProductsResponseType = {
  products: ProductType[]
  total: number;
  skip: number;
  limit: number;
}