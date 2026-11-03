import http from "k6/http";

const BASE_URL = "https://dummyjson.com";

// 1. Fungsi Cari Produk
export function searchProducts(keyword) {
  const url = `${BASE_URL}/products/search?q=${keyword}`;
  return http.get(url);
}

// 2. Fungsi Tambah Order / Checkout (POST)
export function addCart(userId, productId, token) {
  const url = `${BASE_URL}/carts/add`;
  const payload = JSON.stringify({
    userId: userId,
    products: [{ id: productId, quantity: 1 }],
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return http.post(url, payload, params);
}
