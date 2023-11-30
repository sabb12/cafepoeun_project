import { supabase } from "../index";

import {
  GetListParam,
  Cart,
  CartResponse,
  NewCartParam,
  UpdateCartParam,
} from "@/repositories/cart/types";

const SCHEMA_NAME = "cart";

export const mapResponse = (item: CartResponse): Cart => {
  return {
    ...item,
  };
};
// { productID } = param ES6 공부 객체다
export function getList(param?: GetListParam): Promise<Cart[]> {
  return new Promise(function (resolve) {
    // * column모든걸 가져온다
    let query = supabase.from(SCHEMA_NAME).select("*, products(*)");

    if (param?.productID) {
      query = query.eq("productID", param?.productID);
    }

    query
      .order("createdAt", { ascending: false })
      .returns<CartResponse[]>()
      .then(function ({ data }) {
        if (!data) {
          resolve([]);
          return;
        }

        resolve(data.map(mapResponse));
      });
  });
}

export function create(category: NewCartParam): Promise<void> {
  return new Promise<void>(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .insert(category)
      .throwOnError()
      .then(function () {
        resolve();
      });
  }).catch(function (error) {
    if (error.code === "23505") {
      throw Error("중복된 값이 있습니다");
    }

    throw error;
  });
}

export function update(id: number, updateCart: UpdateCartParam): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .update(updateCart)
      .eq("id", id)
      .throwOnError()
      .then(function () {
        resolve();
      });
  });
}

export function deleteById(id: number): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .delete()
      .eq("id", id)
      .throwOnError()
      .then(function () {
        resolve();
      });
  });
}
