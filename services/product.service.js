import http from "k6/http";

const BASE_URL = "https://dummyjson.com";

// 1. Search Produk
export function searchProducts(keyword) {
  return http.get(`${BASE_URL}/products/search?q=${keyword}`);
}

// 2. Filter Kategori Produk
export function filterProducts(category) {
  return http.get(`${BASE_URL}/products/category/${category}`);
}

// 3. Update Produk (PUT)
export function updateProduct(id, newTitle, token) {
  const payload = JSON.stringify({ title: newTitle });
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return http.put(`${BASE_URL}/products/${id}`, payload, params);
}

// 4. Delete Produk (DELETE)
export function deleteProduct(id, token) {
  const params = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return http.del(`${BASE_URL}/products/${id}`, null, params);
}
