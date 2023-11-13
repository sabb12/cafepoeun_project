// 조회 할 때 사용 하는 type
export type ProductResponse = {
  id?: number;
  name?: string;
  imageURL?: string;
  detail?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Product = ProductResponse;

export type NewProductParam = ProductResponse;

// Partial는 property를 optional 하게 만들어 준다
export type UpdateProductParam = Partial<ProductResponse>;
