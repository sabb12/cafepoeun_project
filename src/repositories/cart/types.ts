export type CartResponse = {
  id: number;
  name: string;
  depth: number;
  parentId: number;
};

// 새로 추가 하는 category는 id 추가 할 필요 없다, 서버에서 만들어 준다
export type NewCartParam = CartResponse;
export type UpdateCartParam = CartResponse;

export type GetListParam = {
  depth?: number;
  parentId?: number;
};

export type Cart = CartResponse;
