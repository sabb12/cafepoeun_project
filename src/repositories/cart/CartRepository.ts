import { supabase } from "../index";

import {
  GetListParam,
  Cart,
  CartResponse,
  NewCartParam,
  UpdateCartParam,
} from "@/repositories/cart/types";

const SCHEMA_NAME = "categories";

export const mapResponse = (item: CartResponse): Cart => {
  return {
    ...item,
  };
};

export function getList({ depth, parentId }?: GetListParam): Promise<Cart[]> {
  return new Promise(function (resolve) {
    let query = supabase.from(SCHEMA_NAME).select();

    if (depth) {
      query = query.eq("depth", depth);
    }

    if (parentId) {
      query = query.eq("parentId", parentId);
    }

    query.returns<CartResponse[]>().then(function ({ data }) {
      if (!data) {
        resolve([]);
        return;
      }

      resolve(data.map(mapResponse));
    });
  });
}

export function create(category: NewCartParam): Promise<void> {
  return new Promise(function (resolve) {
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

export function update(updateCart: UpdateCartParam): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .update(updateCart)
      .eq("id", updateCart.id)
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
