import { useEffect, useState } from "react";
import { db, seedProduk } from "./db";
import InputSKU from "./components/InputSKU";
import DaftarPesanan from "./components/DaftarPesanan";
import TransaksiTersimpan from "./components/TransaksiTersimpan";

export default function App() {
  const [items, setItems] = useState([]);
  const [toko, setToko] = useState("");
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    seedProduk().then(() => setSiap(true));
  }, []);

  const total = items.reduce((s, it) => s + it.harga * it.qty, 0);

  const tambahItem = (item) => setItems((prev) => [...prev, item]);
  const hapusItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  async function simpanTransaksi() {
    if (!toko.trim()) return alert("Isi nama toko dulu ya");
    const noOrder =
      "NTV-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      String(Date.now()).slice(-4);

    await db.transaksi.add({
      noOrder,
      toko,
      items,
      total,
      tanggal: new Date().toISOString(),
    });
    setItems([]);
    setToko("");
    alert(`✅ Transaksi ${noOrder} tersimpan`);
  }

  if (!siap) return <p className="p-6 text-slate-600">Menyiapkan data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-teal-700 tracking-tight">
          Notiva
        </h1>
        <p className="text-sm text-slate-500">
          Order & Kasir Ringan untuk UMKM
        </p>
      </header>

      <div className="mb-4">
        <input
          value={toko}
          onChange={(e) => setToko(e.target.value)}
          placeholder="Nama Toko / Pelanggan..."
          className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <InputSKU onAdd={tambahItem} />
      <DaftarPesanan
        items={items}
        total={total}
        onHapus={hapusItem}
        onSimpan={simpanTransaksi}
      />
      <TransaksiTersimpan />

      <footer className="text-center text-xs text-slate-400 mt-8">
        © {new Date().getFullYear()} Notiva — dibuat dengan ❤️ untuk UMKM
      </footer>
    </div>
  );
}