import Dexie from "dexie";

export const db = new Dexie("notivaDB");

db.version(1).stores({
  produk: "++id, sku, nama, harga, satuan",
  transaksi: "++id, noOrder, toko, items, total, tanggal",
});

export async function seedProduk() {
  const count = await db.produk.count();
  if (count === 0) {
    await db.produk.bulkAdd([
      { sku: "KRT-001", nama: "Kertas A4", harga: 45000, satuan: "Krt" },
      { sku: "PAK-001", nama: "Paket ATK", harga: 25000, satuan: "Pak" },
      { sku: "PCS-001", nama: "Pulpen Hitam", harga: 3000, satuan: "Pcs" },
      { sku: "PCS-002", nama: "Pensil 2B", harga: 2500, satuan: "Pcs" },
      { sku: "PCS-003", nama: "Penghapus", harga: 2000, satuan: "Pcs" },
      { sku: "PCS-004", nama: "Spidol Papan", harga: 5000, satuan: "Pcs" },
    ]);
  }
}