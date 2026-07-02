export default function StockStamp({ stock }) {
  if (stock <= 0) return <span className="bh-stamp bh-stamp-out">Ausverkauft</span>;
  if (stock <= 5) return <span className="bh-stamp bh-stamp-low">Knapp · {stock}</span>;
  return <span className="bh-stamp bh-stamp-fresh">Frisch · {stock}</span>;
}
