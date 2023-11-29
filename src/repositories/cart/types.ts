import { ProductResponse } from "../products/types";

export type CartResponse = {
  id: number;
  productID: number;
  count: number;
  checked: boolean;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  products: ProductResponse;
};

// 새로 추가 하는 category는 id 추가 할 필요 없다, 서버에서 만들어 준다
export type Cart = CartResponse;
export type UpdateCartParam = Omit<Partial<CartResponse>, "id">;
export type NewCartParam = Omit<
  CartResponse,
  "id" | "createdAt" | "updatedAt" | "products"
>;
export type addtoCartParam = Omit<Partial<CartResponse>, "id">;
export type GetListParam = {
  productID?: number;
};
