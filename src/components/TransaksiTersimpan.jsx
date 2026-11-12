import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export default function TransaksiTersimpan() {
  const list = useLiveQuery(
    () => db.transaksi.orderBy("id").reverse().toArray(),
    []
  );

  async function hapus(id) {
    if (confirm("Hapus transaksi ini?")) await db.transaksi.delete(id);
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <h2 className="font-bold text-lg mb-3 text-slate-800">
        Transaksi Tersimpan
      </h2>
      {!list || list.length === 0 ? (
        <p className="text-slate-400 text-sm py-4 text-center">
          Belum ada transaksi
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 text-slate-600">
                <th className="py-2">No. Order</th>
                <th>Toko</th>
                <th>Item</th>
                <th>Total Rp</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id} className="border-b border-slate-100">
                  <td className="py-2 font-mono text-xs">{t.noOrder}</td>
                  <td>{t.toko}</td>
                  <td>{t.items.length} produk</td>
                  <td className="font-semibold text-teal-700">
                    Rp {t.total.toLocaleString("id-ID")}
                  </td>
                  <td>
                    <button
                      onClick={() => hapus(t.id)}
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
    </div>
  );
}