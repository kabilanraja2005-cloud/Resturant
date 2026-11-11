# 🛒 SRI Supermarket Management System (Indian Edition)

A clean, medium-level supermarket and Kirana store billing system customized for the **Indian retail environment** with **Indian Rupee (₹ INR)** pricing, authentic FMCG grocery products, and popular payment options (UPI / GPay / PhonePe / Paytm, Cash, Cards).

---

## 🇮🇳 Indian Environment Features

1. **Currency**: All prices, bills, costs, and revenues are displayed in **Indian Rupees (₹ INR)**.
2. **Indian Grocery Catalog**:
   - India Gate Basmati Rice 1kg (₹145)
   - Aashirvaad Shudh Chakki Atta 5kg (₹260)
   - Amul Taaza Toned Milk 1L (₹66)
   - Tata Salt 1kg (₹28)
   - Fortune Sunlite Sunflower Oil 1L (₹160)
   - Maggi 2-Minute Noodles 4-Pack (₹58)
   - Tata Tea Gold Leaf 500g (₹340)
   - Haldiram's Nagpur Aloo Bhujia 400g (₹115)
   - Toor Dal Premium Desi 1kg (₹175)
3. **Indian FMCG Suppliers**:
   - Tata Consumer Products Ltd
   - Amul Gujarat Co-operative Milk Marketing Federation
   - ITC Agro Distribution Ltd
   - Parle & Britannia Wholesalers
4. **Indian Payment Modes**:
   - 📱 **UPI** (Google Pay, PhonePe, Paytm)
   - 💵 **Cash**
   - 💳 **Debit / Credit Card**

---

## 📁 Project Structure

```text
supermarket-system/
├── backend/
│   └── server.js           # Express API server with Indian mock data (₹ INR)
├── frontend/
│   ├── index.html          # Login page (Apna Supermarket)
│   ├── dashboard.html      # Store dashboard with Indian Rupee (₹) metrics
│   ├── product.html        # Grocery catalog management (also proguct.html)
│   ├── stock.html          # Billing counter & inward stock management
│   ├── suppliers.html      # Indian distributors & vendors directory (also supilers.html)
│   └── style.css           # Clean modern styles with dark-blue background gradient
├── package.json
└── README.md
```

---

## 🚀 How to Run

1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
3. Use the demo credentials (or click the quick demo buttons):
   - **Store Manager (Admin)**: `admin` / `admin123`
   - **Billing Cashier**: `cashier` / `cashier123`
