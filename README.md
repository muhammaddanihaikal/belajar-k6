# Belajar k6 - Performance Testing Framework

Repository latihan dan implementasi framework performance testing menggunakan **k6** dengan arsitektur **Modular / Service-Oriented Testing**.

---

## 📁 Struktur Folder Proyek

```text
├── config/              # Konfigurasi beban (VUs, duration) & SLA threshold per service
│   ├── auth.options.js
│   └── product.options.js
├── data/                # Data uji DDT (users.json) & data tumbal (tumbal-products.json)
├── helpers/             # Setup reusable global (authSetup)
├── playground/          # 📦 Arsip modul latihan (belajar-*.js & custom reporter)
├── scripts/             # Script pendukung persiapan data (seed-products.js)
├── services/            # Modul fungsi API reusable (auth.service.js, product.service.js)
└── tests/               # Skenario pengujian performa
    ├── auth/            # Test khusus modul Auth (login.test.js)
    ├── product/         # Test modul Product (search-filter, update, delete)
    └── journeys/        # Test alur nyata pengguna (fast-checkout.test.js)
```

---

## 🚀 Panduan Eksekusi

### 1. Menyiapkan Data Tumbal (Seeder)
Sebelum menjalankan test UPDATE atau DELETE, siapkan data produk tumbal via seeder API:
```bash
npm run seed
# atau: node scripts/seed-products.js
```

### 2. Menjalankan Test Performa (k6)

* **Test Browsing (Search & Filter):**
  ```bash
  k6 run tests/product/search-filter.test.js
  ```

* **Test Mutasi Data (Delete Tumbal):**
  ```bash
  k6 run tests/product/delete-tumbal.test.js
  ```

* **Test Mutasi Data (Update Tumbal):**
  ```bash
  k6 run tests/product/update-tumbal.test.js
  ```

* **Test User Journey (End-to-End):**
  ```bash
  k6 run tests/journeys/fast-checkout.test.js
  ```

---

## 📦 Arsip Latihan (Playground)
Modul-modul dasar untuk me-refresh ingatan tersimpan di folder `playground/`:
* `playground/belajar-k6.js`: Dasar VUs, duration, checks, dan thresholds.
* `playground/belajar-stages.js`: Simulasi trafik bergelombang (`stages`).
* `playground/belajar-post.js`: Pengiriman payload JSON.
* `playground/belajar-chaining.js`: API Chaining (Login -> Bearer Token -> Auth Me).
* `playground/belajar-ddt.js`: Data-Driven Testing via `SharedArray`.
