import fs from "fs";
import { BASE_URL } from "../config/config.js";

const TOTAL_DATA = 10;

async function seedProducts() {
  console.log(`🌱 [SEEDER] Menyiapkan ${TOTAL_DATA} data produk tumbal via API: ${BASE_URL}...`);
  const res = await fetch(`${BASE_URL}/products?limit=${TOTAL_DATA}`);
  const json = await res.json();

  const tumbalList = json.products.map((p) => ({
    id: p.id,
    title: p.title,
  }));

  fs.writeFileSync("data/tumbal-products.json", JSON.stringify(tumbalList, null, 2));
  console.log(`📁 Selesai! ${tumbalList.length} data tumbal tersimpan di: data/tumbal-products.json\n`);
}

seedProducts();
