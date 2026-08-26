import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="rounded-full bg-muted p-4 text-2xl">📡</div>
      <h1 className="mt-4 text-xl font-bold">Kamu sedang offline</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Tidak ada koneksi internet. Beberapa halaman yang pernah kamu buka tetap tersedia dari cache.
      </p>
      <Link href="/" className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
