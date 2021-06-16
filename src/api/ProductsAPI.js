import { client } from "./APIUtils";

export function getProducts(merchantCode, productIds) {
  let url = `/products?merchantCode=${merchantCode}`;
  productIds.forEach((productId, i) => (url += `&codes[${i}]=${productId}`));
  return client.get(url);
}
