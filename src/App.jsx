import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import { SEED_PRODUCTS } from "./data/seedProducts.js";
import { loadData, saveData } from "./utils/storage.js";
import { uid } from "./utils/format.js";

import LoginScreen from "./components/LoginScreen.jsx";
import Navbar from "./components/Navbar.jsx";
import Toast from "./components/Toast.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminInventory from "./components/AdminInventory.jsx";
import AdminOrders from "./components/AdminOrders.jsx";
import CustomerCatalog from "./components/CustomerCatalog.jsx";
import CustomerCart from "./components/CustomerCart.jsx";
import CustomerOrders from "./components/CustomerOrders.jsx";


export default function App() {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let u = await loadData("bh_users", true, null);
    if (!u) {
      u = [{ username: "admin", password: "admin123", role: "admin", name: "Administrador" }];
      await saveData("bh_users", true, u);
    }
    let p = await loadData("bh_products", true, null);
    if (!p) {
      p = SEED_PRODUCTS;
      await saveData("bh_products", true, p);
    }
    let o = await loadData("bh_orders", true, []);
    let s = await loadData("bh_session", false, null);
    setUsers(u);
    setProducts(p);
    setOrders(o);
    if (s) {
      const found = u.find((x) => x.username === s.username);
      if (found) {
        setSession(found);
        setView(found.role === "admin" ? "dashboard" : "catalog");
        const c = await loadData(`bh_cart_${found.username}`, false, []);
        setCart(c);
      }
    }

    setReady(true);
  }

  function showToast(msg, type = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  }

  async function handleLogin(username, password) {
    if (!username || !password) {
      showToast("Completa usuario y contraseña", "error");
      return false;
    }
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) {
      showToast("Usuario o contraseña incorrectos", "error");
      return false;
    }
    setSession(found);
    setView(found.role === "admin" ? "dashboard" : "catalog");
    await saveData("bh_session", false, { username: found.username });
    const c = await loadData(`bh_cart_${found.username}`, false, []);
    setCart(c);
    showToast(`Bienvenido, ${found.name}`);
    return true;
  }

  async function handleRegister(username, password, name) {
    if (!username || !password || !name) {
      showToast("Completa todos los campos", "error");
      return false;
    }
    if (users.some((u) => u.username === username)) {
      showToast("Ese usuario ya existe", "error");
      return false;
    }
    const newUser = { username, password, role: "cliente", name };
    const updated = [...users, newUser];
    setUsers(updated);
    await saveData("bh_users", true, updated);
    setSession(newUser);
    setView("catalog");
    await saveData("bh_session", false, { username });
    setCart([]);
    showToast(`Cuenta creada. ¡Bienvenido, ${name}!`);
    return true;
  }

  async function handleLogout() {
    setSession(null);
    setCart([]);
    await saveData("bh_session", false, null);
  }

  async function saveProduct(product) {
    let updated;
    if (product.id) updated = products.map((p) => (p.id === product.id ? product : p));
    else updated = [...products, { ...product, id: uid("prod") }];
    setProducts(updated);
    await saveData("bh_products", true, updated);
    showToast("Producto guardado");
  }

  async function deleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    await saveData("bh_products", true, updated);
    showToast("Producto eliminado");
  }

  async function updateOrderStatus(orderId, status) {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    await saveData("bh_orders", true, updated);
  }

  async function persistCart(newCart) {
    setCart(newCart);
    if (session) await saveData(`bh_cart_${session.username}`, false, newCart);
  }

  function addToCart(product, qty) {
    const existing = cart.find((c) => c.productId === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map((c) => (c.productId === product.id ? { ...c, qty: Math.min(c.qty + qty, product.stock) } : c));
    } else {
      newCart = [...cart, { productId: product.id, name: product.name, price: product.price, qty: Math.min(qty, product.stock) }];
    }
    persistCart(newCart);
    showToast(`${product.name} añadido al carrito`);
  }

  function changeCartQty(productId, delta) {
    const product = products.find((p) => p.id === productId);
    const newCart = cart.map((c) =>
      c.productId === productId
        ? { ...c, qty: Math.max(1, Math.min(c.qty + delta, product ? product.stock : c.qty + delta)) }
        : c
    );
    persistCart(newCart);
  }

  function removeFromCart(productId) {
    persistCart(cart.filter((c) => c.productId !== productId));
  }

  async function checkout() {
    const freshProducts = await loadData("bh_products", true, products);
    for (const item of cart) {
      const p = freshProducts.find((x) => x.id === item.productId);
      if (!p || p.stock < item.qty) {
        showToast(`Stock insuficiente para ${item.name}`, "error");
        setProducts(freshProducts);
        return false;
      }
    }
    const updatedProducts = freshProducts.map((p) => {
      const item = cart.find((c) => c.productId === p.id);
      return item ? { ...p, stock: p.stock - item.qty } : p;
    });
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const newOrder = {
      id: uid("ord"),
      customerUsername: session.username,
      customerName: session.name,
      items: cart,
      total,
      status: "Pendiente",
      date: new Date().toISOString(),
    };
    const freshOrders = await loadData("bh_orders", true, orders);
    const updatedOrders = [newOrder, ...freshOrders];
    setProducts(updatedProducts);
    setOrders(updatedOrders);
    await saveData("bh_products", true, updatedProducts);
    await saveData("bh_orders", true, updatedOrders);
    await persistCart([]);
    showToast("Pedido confirmado. ¡Gracias por tu compra!");
    return true;
  }

  if (!ready) {
    return (
      <div className="bh-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Loader2 className="bh-spin" size={28} color="#1F3B2C" />
      </div>
    );
  }

  if (!session) {
    return <LoginScreen onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const isAdmin = session.role === "admin";
  const myOrders = orders.filter((o) => o.customerUsername === session.username);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="bh-root">
      <Navbar session={session} onLogout={handleLogout} cartCount={cartCount} view={view} setView={setView} isAdmin={isAdmin} />

      {isAdmin && view === "dashboard" && <AdminDashboard products={products} orders={orders} />}
      {isAdmin && view === "inventory" && <AdminInventory products={products} onSave={saveProduct} onDelete={deleteProduct} />}
      {isAdmin && view === "orders" && <AdminOrders orders={orders} onUpdateStatus={updateOrderStatus} />}

      {!isAdmin && view === "catalog" && <CustomerCatalog products={products} onAdd={addToCart} />}
      {!isAdmin && view === "cart" && (
        <CustomerCart cart={cart} products={products} onChangeQty={changeCartQty} onRemove={removeFromCart} onCheckout={checkout} setView={setView} />
      )}
      {!isAdmin && view === "myorders" && <CustomerOrders orders={myOrders} />}

      <Toast toast={toast} />
    </div>
  );
}
