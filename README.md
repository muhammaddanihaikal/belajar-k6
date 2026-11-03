# Belajar k6 - Performance Testing

Repository latihan dan implementasi framework performance testing menggunakan **k6** dengan pola arsitektur **Modular / Service-Oriented Testing**.

---

## 📁 Struktur Folder

```text
├── config/              # Konfigurasi beban (VUs, duration) & SLA threshold per service
│   ├── auth.options.js
│   └── product.options.js
├── data/                # Data uji DDT (Data-Driven Testing)
│   └── users.json
├── services/            # Modul fungsi API reusable (HTTP GET, POST, payload, headers)
│   ├── auth.service.js
│   └── product.service.js
└── tests/               # Skenario pengetesan
    ├── auth/            # Test khusus modul Auth (Login)
    │   └── login.test.js
    ├── product/         # Test khusus modul Product (Katalog/Search)
    │   └── search-product.test.js
    └── journeys/        # Test alur nyata pengguna (End-to-End)
        └── fast-checkout.test.js
```

---

## 🚀 Cara Menjalankan Test

Pastikan k6 sudah terinstal di komputer kamu:

### 1. Test Service Auth (Login)
```bash
k6 run tests/auth/login.test.js
```

### 2. Test Service Product (Search)
```bash
k6 run tests/product/search-product.test.js
```

### 3. Test User Journey (Fast Checkout E2E)
```bash
k6 run tests/journeys/fast-checkout.test.js
```

---

## 📚 Materi yang Dipelajari
1. Dasar k6 (Virtual Users, Duration, Thresholds/SLA).
2. Traffic Simulation (`stages`: ramp-up, peak, ramp-down).
3. POST Request & API Chaining (Login -> Bearer Token -> Auth Me).
4. Data-Driven Testing (DDT) menggunakan `SharedArray`.
5. Modular Service Pattern & Pemisahan Config vs Test.
