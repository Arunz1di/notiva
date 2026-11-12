export default function DaftarPesanan({ items, onHapus, onSimpan, total }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-100">
      <h2 className="font-bold text-lg mb-3 text-slate-800">
        Daftar Produk di Nota Ini
      </h2>

      {items.length === 0 ? (
        <p className="text-slate-400 text-sm py-4 text-center">
          Belum ada produk ditambahkan
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 text-slate-600">
                <th className="py-2">SKU</th>
                <th>Nama</th>
                <th>Qty</th>
                <th>Harga</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 font-mono text-xs">{it.sku}</td>
                  <td>{it.nama}</td>
                  <td>
                    {it.qty} {it.satuanPilihan}
                  </td>
                  <td>Rp {it.harga.toLocaleString("id-ID")}</td>
                  <td className="font-semibold">
                    Rp {(it.harga * it.qty).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <button
                      onClick={() => onHapus(i)}
                      className="text-red-500 hover:text-red-700 text-xs hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-between items-center gap-2 border-t pt-3">
        <span className="font-bold text-lg text-teal-700">
          Total Semua Nota: Rp {total.toLocaleString("id-ID")}
        </span>
        <button
          onClick={onSimpan}
          disabled={items.length === 0}
          className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Simpan Transaksi
        </button>
      </div>
    </div>
  );
}