import fs from "fs";

const BASE_URL = "https://dummyjson.com";
const TOTAL_DATA = 10; // 10 data tumbal untuk contoh

async function seedProducts() {
  console.log(`🌱 [SEEDER] Menyiapkan ${TOTAL_DATA} data produk tumbal via API...`);

  // Di project kantor nyata: loop POST /products/add untuk bikin data baru
  // Di DummyJSON (Mock API): ambil ID produk yang ada agar bisa di-UPDATE / di-DELETE
  const res = await fetch(`${BASE_URL}/products?limit=${TOTAL_DATA}`);
  const json = await res.json();

  const tumbalList = json.products.map((p) => ({
    id: p.id,
    title: p.title,
  }));

  // Simpan ke file JSON
  fs.writeFileSync("data/tumbal-products.json", JSON.stringify(tumbalList, null, 2));
  console.log(`📁 Selesai! ${tumbalList.length} data tumbal tersimpan di: data/tumbal-products.json\n`);
}

seedProducts();
