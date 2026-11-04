import { check, sleep } from "k6";
import { authSetup } from "../../helpers/setup.helper.js";
import { searchProducts, addCart } from "../../services/product.service.js";

// 1. Opsi Beban & SLA (Langsung di sini)
export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // Respon alur < 1.5 detik
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};

// 2. Login 1x di awal untuk ambil token bersama
export const setup = authSetup;

// 3. Skenario Utama Alur Cepat
export default function (data) {
  // A. Cari Produk
  const searchRes = searchProducts("laptop");
  const productId = searchRes.json("products.0.id");

  // B. Checkout Produk
  const cartRes = addCart(data.userId, productId, data.token);
  check(cartRes, {
    "checkout berhasil": (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
