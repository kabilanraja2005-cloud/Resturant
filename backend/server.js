const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Mock Users for Authentication
const USERS = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Store Manager', role: 'admin' },
  { id: 2, username: 'cashier', password: 'cashier123', name: 'Ramesh Cashier', role: 'cashier' }
];

// Indian Suppliers (Sequential IDs: 1, 2, 3...)
let suppliers = [
  { id: 1, name: 'Tata Consumer Products Ltd', contact: 'supply@tataconsumer.com', phone: '+91 98201 12345' },
  { id: 2, name: 'Amul Gujarat Co-op Federation', contact: 'sales@amul.coop', phone: '+91 98450 67890' },
  { id: 3, name: 'ITC Agro Distribution Ltd', contact: 'orders@itcagro.in', phone: '+91 98112 34567' },
  { id: 4, name: 'Parle & Britannia Wholesalers', contact: 'dist@parlebritt.in', phone: '+91 98330 98765' }
];

// Popular Indian Supermarket Grocery Items (Strictly Sequential IDs: 1, 2, 3, 4, 5...)
let products = [
  { id: 1, name: 'India Gate Basmati Rice 1kg', category: 'Grains & Rice', supplierId: 3, costPrice: 110, sellPrice: 145, stock: 50, barcode: '890123456701' },
  { id: 2, name: 'Aashirvaad Shudh Chakki Atta 5kg', category: 'Atta & Flour', supplierId: 3, costPrice: 215, sellPrice: 260, stock: 35, barcode: '890123456702' },
  { id: 3, name: 'Amul Taaza Toned Milk 1L', category: 'Dairy', supplierId: 2, costPrice: 56, sellPrice: 66, stock: 40, barcode: '890123456703' },
  { id: 4, name: 'Tata Salt 1kg', category: 'Spices & Salt', supplierId: 1, costPrice: 22, sellPrice: 28, stock: 80, barcode: '890123456704' },
  { id: 5, name: 'Fortune Sunlite Sunflower Oil 1L', category: 'Edible Oils', supplierId: 3, costPrice: 135, sellPrice: 160, stock: 8, barcode: '890123456705' },
  { id: 6, name: 'Maggi 2-Minute Noodles 4-Pack (280g)', category: 'Snacks & Noodles', supplierId: 1, costPrice: 48, sellPrice: 58, stock: 25, barcode: '890123456706' },
  { id: 7, name: 'Tata Tea Gold Leaf 500g', category: 'Beverages', supplierId: 1, costPrice: 280, sellPrice: 340, stock: 6, barcode: '890123456707' },
  { id: 8, name: 'Haldiram Nagpur Aloo Bhujia 400g', category: 'Snacks & Namkeen', supplierId: 4, costPrice: 90, sellPrice: 115, stock: 20, barcode: '890123456708' },
  { id: 9, name: 'Toor Dal Premium Desi 1kg', category: 'Pulses & Dals', supplierId: 3, costPrice: 140, sellPrice: 175, stock: 5, barcode: '890123456709' }
];

let purchases = [
  { id: 1, productId: 1, productName: 'India Gate Basmati Rice 1kg', quantity: 60, unitCost: 110, total: 6600, date: '2026-10-20 09:30' },
  { id: 2, productId: 2, productName: 'Aashirvaad Shudh Chakki Atta 5kg', quantity: 40, unitCost: 215, total: 8600, date: '2026-10-21 11:15' },
  { id: 3, productId: 3, productName: 'Amul Taaza Toned Milk 1L', quantity: 50, unitCost: 56, total: 2800, date: '2026-10-22 14:00' }
];

let sales = [
  { id: 1001, productId: 1, productName: 'India Gate Basmati Rice 1kg', quantity: 2, unitPrice: 145, total: 290, cashier: 'Ramesh Cashier', paymentMethod: 'UPI (GPay)', date: '2026-10-23 10:14' },
  { id: 1002, productId: 3, productName: 'Amul Taaza Toned Milk 1L', quantity: 3, unitPrice: 66, total: 198, cashier: 'Ramesh Cashier', paymentMethod: 'Cash', date: '2026-10-23 13:45' },
  { id: 1003, productId: 6, productName: 'Maggi 2-Minute Noodles 4-Pack (280g)', quantity: 4, unitPrice: 58, total: 232, cashier: 'Ramesh Cashier', paymentMethod: 'UPI (PhonePe)', date: '2026-10-24 16:20' }
];

// Helper: Format local date time
function getNowFormatted() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

// --- AUTHENTICATION ROUTES ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter both username and password.' });
  }

  const user = USERS.find(u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password. Try admin/admin123 or cashier/cashier123' });
  }

  res.json({
    token: 'jwt-mock-session-' + Buffer.from(user.username).toString('base64'),
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    }
  });
});

// --- DASHBOARD ANALYTICS ROUTE ---
app.get('/api/dashboard/stats', (req, res) => {
  const totalSales = sales.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
  const totalPurchases = purchases.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
  const totalItemsSold = sales.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);
  
  const inventoryValuation = products.reduce((acc, curr) => acc + ((Number(curr.stock) || 0) * (Number(curr.sellPrice) || 0)), 0);
  const inventoryCost = products.reduce((acc, curr) => acc + ((Number(curr.stock) || 0) * (Number(curr.costPrice) || 0)), 0);
  const estimatedProfit = totalSales - totalPurchases;
  const lowStockItems = products.filter(p => p.stock < 10);

  const categoryCounts = {};
  products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const productSalesMap = {};
  sales.forEach(s => {
    const key = s.productName || `Product #${s.productId}`;
    productSalesMap[key] = (productSalesMap[key] || 0) + s.quantity;
  });
  const topProducts = Object.entries(productSalesMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  res.json({
    currency: '₹',
    totalSales: Number(totalSales.toFixed(2)),
    totalPurchases: Number(totalPurchases.toFixed(2)),
    estimatedProfit: Number(estimatedProfit.toFixed(2)),
    inventoryValuation: Number(inventoryValuation.toFixed(2)),
    inventoryCost: Number(inventoryCost.toFixed(2)),
    totalProducts: products.length,
    lowStockCount: lowStockItems.length,
    lowStockItems,
    totalSuppliers: suppliers.length,
    totalItemsSold,
    categoryCounts,
    topProducts,
    recentSales: sales.slice(-5).reverse(),
    recentPurchases: purchases.slice(-5).reverse()
  });
});

// --- SUPPLIER ROUTES ---
app.get('/api/suppliers', (req, res) => res.json(suppliers));

app.post('/api/suppliers', (req, res) => {
  const { name, contact, phone } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Supplier name is required' });

  // Sequential ID: next order number
  const nextSupplierId = suppliers.length + 1;

  const newSupplier = {
    id: nextSupplierId,
    name: name.trim(),
    contact: (contact || '').trim(),
    phone: (phone || '').trim()
  };
  suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

app.delete('/api/suppliers/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = suppliers.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Supplier not found' });

  const linked = products.filter(p => p.supplierId === id);
  if (linked.length > 0) {
    return res.status(400).json({ 
      error: `Cannot delete supplier. ${linked.length} products are linked to this supplier.` 
    });
  }

  // Remove supplier
  suppliers.splice(index, 1);

  // Re-sequence remaining suppliers: 1, 2, 3...
  suppliers.forEach((s, idx) => {
    const oldId = s.id;
    const newId = idx + 1;
    s.id = newId;

    // Update any products mapped to this supplier
    products.forEach(p => {
      if (p.supplierId === oldId) p.supplierId = newId;
    });
  });

  res.json({ message: 'Supplier deleted and IDs re-ordered successfully', suppliers });
});

// --- PRODUCT ROUTES ---
app.get('/api/products', (req, res) => res.json(products));

app.post('/api/products', (req, res) => {
  const { name, category, supplierId, costPrice, sellPrice, initialStock, barcode } = req.body;
  
  if (!name || !name.trim() || costPrice == null || sellPrice == null) {
    return res.status(400).json({ error: 'Please enter product name, cost price and selling price.' });
  }

  const cost = parseFloat(costPrice);
  const sell = parseFloat(sellPrice);
  const stock = parseInt(initialStock, 10) || 0;

  if (isNaN(cost) || cost < 0 || isNaN(sell) || sell < 0) {
    return res.status(400).json({ error: 'Cost and Selling price must be valid positive numbers.' });
  }

  // Sequential ID: next order number (e.g. 10 if there are 9 items, NOT Date.now())
  const nextProductId = products.length + 1;

  const newProduct = {
    id: nextProductId,
    name: name.trim(),
    category: (category || 'General Grocery').trim(),
    supplierId: Number(supplierId) || (suppliers[0] ? suppliers[0].id : 1),
    costPrice: cost,
    sellPrice: sell,
    stock: stock >= 0 ? stock : 0,
    barcode: barcode ? barcode.trim() : '890' + Math.floor(100000000 + Math.random() * 900000000)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const { name, category, supplierId, costPrice, sellPrice, stock, barcode } = req.body;

  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category.trim();
  if (supplierId !== undefined) product.supplierId = Number(supplierId);
  if (costPrice !== undefined) product.costPrice = parseFloat(costPrice);
  if (sellPrice !== undefined) product.sellPrice = parseFloat(sellPrice);
  if (stock !== undefined) product.stock = Math.max(0, parseInt(stock, 10));
  if (barcode !== undefined) product.barcode = barcode.trim();

  res.json(product);
});

// DELETE PRODUCT WITH AUTOMATIC SEQUENTIAL ID RE-ORDERING
// e.g. If product #3 is deleted, #4 becomes #3, #5 becomes #4, etc.
app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  // Remove the product
  products.splice(index, 1);

  // Re-number all remaining products sequentially: 1, 2, 3, 4, 5...
  products.forEach((p, idx) => {
    const oldId = p.id;
    const newId = idx + 1;
    p.id = newId;

    // Update sales and purchases references to keep them synchronized
    sales.forEach(s => {
      if (s.productId === oldId) s.productId = newId;
    });
    purchases.forEach(pur => {
      if (pur.productId === oldId) pur.productId = newId;
    });
  });

  res.json({ message: 'Product deleted and IDs re-ordered in sequence successfully', products });
});

// --- PURCHASES (RESTOCK) ROUTES ---
app.get('/api/purchases', (req, res) => res.json(purchases));

app.post('/api/purchases', (req, res) => {
  const { productId, quantity, unitCost } = req.body;
  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const qty = parseInt(quantity, 10);
  const cost = parseFloat(unitCost);

  if (isNaN(qty) || qty <= 0) {
    return res.status(400).json({ error: 'Purchase quantity must be greater than 0' });
  }
  if (isNaN(cost) || cost < 0) {
    return res.status(400).json({ error: 'Unit cost must be a valid positive number' });
  }

  const total = Number((qty * cost).toFixed(2));
  product.stock += qty;
  product.costPrice = cost;

  const newPurchase = {
    id: purchases.length + 1,
    productId: product.id,
    productName: product.name,
    quantity: qty,
    unitCost: cost,
    total,
    date: getNowFormatted()
  };
  purchases.push(newPurchase);
  res.status(201).json(newPurchase);
});

// --- SALES ROUTES ---
app.get('/api/sales', (req, res) => res.json(sales));

app.post('/api/sales', (req, res) => {
  const { productId, quantity, cashier, paymentMethod } = req.body;
  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const qty = parseInt(quantity, 10);
  if (isNaN(qty) || qty <= 0) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  if (product.stock < qty) {
    return res.status(400).json({ 
      error: `Insufficient stock! Only ${product.stock} units of "${product.name}" available.` 
    });
  }

  product.stock -= qty;

  const total = Number((qty * product.sellPrice).toFixed(2));
  const newSale = {
    id: 1000 + sales.length + 1,
    productId: product.id,
    productName: product.name,
    category: product.category,
    quantity: qty,
    unitPrice: product.sellPrice,
    total,
    cashier: cashier || 'Store Cashier',
    paymentMethod: paymentMethod || 'UPI',
    date: getNowFormatted()
  };
  sales.push(newSale);
  res.status(201).json(newSale);
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Server internal error:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Indian Supermarket Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
