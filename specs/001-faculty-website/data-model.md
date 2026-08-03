# Data Model: Faculty Website & Admin CMS

## Entity-Relationship Overview

```
Blueprint ──┐
Dosen     ──┤
UKM       ──┤
Event     ──┼── (independent entities, no cross-relations)
News      ──┤
FAQ       ──┤
Struktur  ──┤ (self-referential: parent-child)
Message   ──┘
```

## Entities

### Blueprint (Fasilitas Kampus)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| title | String | Required | Nama fasilitas |
| category | String | Required | Kategori (Gedung, Laboratorium, dll.) |
| description | String | Required | Deskripsi fasilitas |
| details | String | Optional | Detail tambahan |
| image | String | Optional | UploadThing URL |
| order | Int | @default(0) | Urutan tampilan |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### Dosen

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| name | String | Required | Nama lengkap |
| gelar | String | Required | Gelar akademik |
| jabatan | String | Optional | Jabatan struktural |
| bidangKeahlian | String | Optional | Bidang keahlian |
| minatRiset | String | Optional | Minat riset |
| email | String | Optional @unique | |
| foto | String | Optional | UploadThing URL |
| order | Int | @default(0) | |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### UKM

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| name | String | Required | Nama UKM |
| description | String | Required | Deskripsi |
| kegiatan | String | Optional | Kegiatan utama |
| kontak | String | Optional | Kontak person |
| logo | String | Optional | UploadThing URL |
| order | Int | @default(0) | |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### Event

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| title | String | Required | Judul acara |
| slug | String | @unique | Human-readable URL |
| status | StatusEvent | @default(akanDatang) | Enum: akanDatang, sedangBerlangsung, selesai |
| date | DateTime | Required | Tanggal acara |
| time | String | Optional | Waktu acara |
| location | String | Optional | Lokasi |
| description | String | Required | Deskripsi |
| details | String | Optional | Detail tambahan |
| poster | String | Optional | UploadThing URL |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### News (Berita)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| title | String | Required | Judul berita |
| slug | String | @unique | Human-readable URL |
| date | DateTime | @default(now()) | Tanggal publikasi |
| summary | String | Required | Ringkasan |
| content | String | Required | Konten artikel |
| image | String | Optional | UploadThing URL (hero image) |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### FAQ

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| question | String | Required | Pertanyaan |
| answer | String | Required | Jawaban |
| category | String | Optional | Kategori FAQ |
| order | Int | @default(0) | Urutan tampilan |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### Struktur Organisasi

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| name | String | Required | Nama pejabat |
| jabatan | String | Required | Nama jabatan |
| parentId | String? | @relation("OrgHierarchy") | Parent node (null = root) |
| parent | StrukturOrganisasi? | @relation("OrgHierarchy", fields: [parentId], references: [id]) | |
| children | StrukturOrganisasi[] | | Child nodes |
| detailTugas | String | Optional | Deskripsi tugas |
| order | Int | @default(0) | |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

### Message (Pesan Kontak)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | String (cuid) | @id @default(cuid()) | |
| name | String | Required | Nama pengirim |
| email | String | Required | Email pengirim |
| phone | String | Optional | Telepon |
| subject | String | Required | Subjek |
| message | String | Required | Isi pesan |
| isRead | Boolean | @default(false) | Status dibaca |
| createdAt | DateTime | @default(now()) | |
| updatedAt | DateTime | @updatedAt | |

## Enums

```prisma
enum StatusEvent {
  akanDatang
  sedangBerlangsung
  selesai
}
```

## Validation Rules

| Entity | Field | Rule |
|--------|-------|------|
| Message | name | Tidak boleh kosong |
| Message | email | Format email valid |
| Message | subject | Tidak boleh kosong |
| Message | message | Tidak boleh kosong |
| Event | slug | Auto-generated from title, unique |
| News | slug | Auto-generated from title, unique |
| All | image/poster/logo/foto | Placeholder jika UploadThing URL null |

## State Transitions

### Message

```
[Created] → [Read] (admin membuka detail)
```

### Event

```
[Akan Datang] → [Sedang Berlangsung] → [Selesai]
```

(Transitions managed manually by admin via edit form)

## Prisma Schema Generation

All models use `cuid()` for primary keys and `@map()` for table names. See `prisma/schema.prisma` for implementation.
