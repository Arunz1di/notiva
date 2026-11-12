import { useState } from "react";
import { db } from "../db";

export default function InputSKU({ onAdd }) {
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState(1);
  const [satuan, setSatuan] = useState("Pcs");
  const [pesan, setPesan] = useState({ type: "", text: "" });

  async function handleCari(e) {
    e.preventDefault();
    setPesan({ type: "", text: "" });

    const produk = await db.produk
      .where("sku")
      .equalsIgnoreCase(sku.trim())
      .first();

    if (!produk) {
      setPesan({ type: "error", text: "❌ SKU tidak ditemukan" });
      return;
    }

    onAdd({ ...produk, qty: Number(qty), satuanPilihan: satuan });
    setPesan({ type: "ok", text: `✅ ${produk.nama} ditambahkan` });
    setSku("");
    setQty(1);
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-100">
      <h2 className="font-bold text-lg mb-3 text-slate-800">Input SKU Produk</h2>
      <form onSubmit={handleCari} className="flex flex-wrap gap-2">
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Masukkan SKU..."
          className="border border-slate-300 p-2 rounded-lg flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          min="1"
          className="border border-slate-300 p-2 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={satuan}
          onChange={(e) => setSatuan(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option>Pcs</option>
          <option>Pak</option>
          <option>Krt</option>
        </select>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium">
          Tambah
        </button>
      </form>
      {pesan.text && (
        <p
          className={`mt-2 text-sm ${
            pesan.type === "error" ? "text-red-600" : "text-teal-600"
          }`}
        >
          {pesan.text}
        </p>
      )}
    </div>
  );
}