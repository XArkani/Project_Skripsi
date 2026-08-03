# Admin Panel CRUD — Design Document

## Ringkasan

Membangun admin panel lengkap dengan sidebar navigasi untuk CRUD semua faculty models (Blueprint, Dosen, UKM, Event, Berita, FAQ, Struktur, Messages), menggunakan shared components (DataTable + FormModal + ImageUpload), Uploadthing untuk file upload, dan generic server actions.

## Prasyarat

- User sudah setuju dengan Pendekatan 1 (per-model pages + shared components)
- User sudah setuju: sidebar layout, shared components, generic server actions, Uploadthing, single admin authorization, clear data dari DB

## Arsitektur Route

```
app/(dashboard)/
  admin/
    layout.tsx              # Sidebar layout + auth check
    page.tsx                # Dashboard overview (existing, diubah)
    blueprint/page.tsx      # CRUD Blueprint
    dosen/page.tsx          # CRUD Dosen
    ukm/page.tsx            # CRUD UKM
    event/page.tsx          # CRUD Event
    berita/page.tsx         # CRUD Berita (pindah dari existing)
    faq/page.tsx            # CRUD FAQ
    struktur/page.tsx       # CRUD Struktur Organisasi
    messages/page.tsx       # Messages inbox (pindah dari existing)
```

## Komponen

### `components/admin/AdminSidebar.tsx`
- Sidebar navigasi dengan logo "Admin Panel", nav links, active state, logout button
- Menggunakan shadcn Sheet untuk mobile, Sidebar component untuk desktop
- Links: Dashboard, Blueprint, Dosen, UKM, Event, Berita, FAQ, Struktur, Messages

### `components/admin/DataTable.tsx`
- Generic table component menerima props: `columns` (FieldConfig[]), `data` (T[]), `onEdit`, `onDelete`
- Search filter, pagination via URL search params
- Kolom aksi: edit dan delete dengan confirm dialog
- Menggunakan shadcn Table, Input (search), Button

### `components/admin/FormModal.tsx`
- Modal untuk create/edit record
- Menerima props: `fields` (FieldConfig[]), `initialData` (T | null), `onSubmit`, `open`, `onOpenChange`
- Render form fields berdasarkan konfigurasi: text, textarea, number, image, select, date
- Validasi required field di client
- Submit panggil server action + toast feedback
- Menggunakan shadcn Dialog, Form, Input, Textarea, Select, Button

### `components/admin/ImageUpload.tsx`
- Wrapper Uploadthing `UploadButton`
- Menampilkan preview gambar setelah upload
- Callback mengembalikan URL string
- Mode: single image (return string)

### `lib/admin-field-configs.ts`
- Type definition untuk FieldConfig
- Array konfigurasi untuk setiap model:

| Field            | Blueprint | Dosen | UKM | Event | Berita | FAQ | Struktur |
|-----------------|-----------|-------|-----|-------|--------|-----|----------|
| id              | auto      | auto  | auto| auto  | auto   | auto| auto     |
| title/nama      | title     | nama  | nama| title | title  | tanya | namaJabatan |
| description/isi | deskripsi | -     | -   | -     | konten | jawab | - |
| image           | gambarUrl | fotoUrl | logoUrl | posterUrl | gambarUrl | - | - |
| link/url        | -         | urlGoogleScholar | - | linkPendaftaran | sumberUrl | - | - |
| category/jabatan| -         | jabatan, bidangKeahlian | kategori | kategori | kategori | kategori | - |
| other fields    | -         | nidn, pendidikan, email | singkatan, deskripsi | tanggal, lokasi, waktu | penulis, tanggal | urutan | urutan |

### `lib/admin-actions.ts`
Server actions generik:

```typescript
export async function createRecord(model: ModelName, data: Record<string, unknown>)
export async function updateRecord(model: ModelName, id: string, data: Record<string, unknown>)
export async function deleteRecord(model: ModelName, id: string)
```
- Validasi session admin
- `revalidateTag(model)` setelah success
- Prisma query dinamis: `prisma[model as keyof typeof prisma]`
- Error handling + return { success, error }

## Uploadthing Integration

1. Install `uploadthing` dan `@uploadthing/react`
2. API route: `app/api/uploadthing/core.ts` + `app/api/uploadthing/route.ts`
3. `lib/uploadthing.ts`: export `UploadButton` dari komponen Uploadthing
4. Uploadthing env vars: `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`
5. Image field otomatis render `ImageUpload` component berdasarkan `type: "image"`

## Authorization

- Di `app/(dashboard)/admin/layout.tsx`:
  1. Panggil `auth()` dari Better Auth
  2. Cek `session?.user?.email === process.env.ADMIN_EMAIL`
  3. Jika tidak cocok: redirect ke `/login` atau tampilkan "Access Denied"
  4. Jika cocok: render children (sidebar + content)

## Data Clearing

- Setelah design doc approved: jalankan Prisma query untuk hapus semua data dari 8 faculty models:
  ```sql
  TRUNCATE TABLE Blueprint, Dosen, UKM, Event, News, FAQ, Struktur, Message RESTART IDENTITY CASCADE;
  ```
- Seed script (`prisma/seed.ts`): biarkan fungsi auth seed (admin user) tetap jalan, hapus/comment bagian seed data faculty

## Migrasi dari Existing

Yang existing (`AdminDashboard.tsx`) berisi:
- CRUD News (create/edit/delete) → pindah ke `app/(dashboard)/admin/berita/page.tsx`
- Messages inbox → pindah ke `app/(dashboard)/admin/messages/page.tsx`
- Overview card (statistik) → tetap di `app/(dashboard)/admin/page.tsx`

File `AdminDashboard.tsx` akan dihapus setelah dipindah.

## Alur User

1. Admin login via `/login` (Better Auth)
2. Redirect ke `/admin` (dashboard overview)
3. Klik sidebar → pilih model → lihat DataTable dengan semua records
4. Klik "Tambah" → FormModal muncul → isi data + upload gambar → submit
5. Klik "Edit" → FormModal dengan data existing → edit → submit
6. Klik "Delete" → confirm dialog → hapus
7. Toast notification untuk success/error
