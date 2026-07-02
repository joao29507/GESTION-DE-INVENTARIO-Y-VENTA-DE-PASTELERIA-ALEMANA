# Bäckerei Holzapfel — Gestión de inventario y ventas

Aplicación web para una pastelería alemana con dos tipos de cuenta:

- **Admin** (usuario `admin` / contraseña `admin123`): panel de resumen, gestión
  de inventario (alta/edición/baja de productos y stock) y gestión de pedidos.
- **Cliente** (se registra libremente): catálogo de productos, carrito de
  compra e historial de pedidos.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite (normalmente `http://localhost:5173`).

## Estructura del proyecto

```
src/
  main.jsx                 punto de entrada
  App.jsx                  estado global y enrutado de vistas
  styles.css                estilos globales (tokens de marca, tipografía)
  data/
    constants.js            nombre de tienda, categorías, estados de pedido
    seedProducts.js         productos iniciales (Schwarzwälder Kirschtorte, etc.)
  utils/
    storage.js               capa de persistencia (ver nota abajo)
    format.js                helpers de formato (euros, fechas, ids)
  components/
    LoginScreen.jsx
    Navbar.jsx
    StockStamp.jsx
    StatusPill.jsx
    Toast.jsx
    AdminDashboard.jsx
    AdminInventory.jsx
    ProductFormModal.jsx
    AdminOrders.jsx
    CustomerCatalog.jsx
    ProductCard.jsx
    CustomerCart.jsx
    CustomerOrders.jsx
```

## Nota importante sobre la persistencia y la autenticación

Este proyecto usa `src/utils/storage.js`, una capa que guarda los datos en
`localStorage` del navegador (productos, pedidos, usuarios, carritos). Esto
significa que:

- Los datos **solo se guardan en el navegador donde se usa la app**, no en un
  servidor. Si la abres desde otro dispositivo, no verá los mismos datos.
- El inicio de sesión es una simulación (usuarios y contraseñas en texto
  plano dentro del propio navegador). **No uses este sistema tal cual con
  datos reales de clientes.**

Para producción real necesitas:

1. Un backend con base de datos (Node/Express + PostgreSQL, Firebase,
   Supabase, etc.) que reemplace las funciones de `src/utils/storage.js`
   por llamadas a una API real.
2. Autenticación segura (contraseñas cifradas, tokens de sesión / JWT,
   HTTPS).

La estructura de componentes está pensada para que ese cambio sea sencillo:
solo hay que editar `src/utils/storage.js` y las funciones de
autenticación en `src/App.jsx`.
