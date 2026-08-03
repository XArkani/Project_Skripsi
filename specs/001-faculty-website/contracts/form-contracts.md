# Form Contracts

## Contact Form (Hubungi Kami)

```typescript
interface ContactFormData {
  name: string      // Required, min 1 char
  email: string     // Required, valid email format
  phone?: string    // Optional
  subject: string   // Required, min 1 char
  message: string   // Required, min 1 char
}

interface ContactFormState {
  values: ContactFormData
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    subject?: string[]
    message?: string[]
  }
  success: boolean
  honeypot?: string // Hidden field for bot detection
}
```

## CRUD Forms (Admin)

All admin CRUD forms follow the same pattern:

```typescript
interface CrudFormState<T> {
  values: Partial<T>
  errors?: Record<keyof T, string[]>
  success: boolean
}
```

Each entity's create/edit form corresponds to its model fields (see data-model.md). Image/file fields use UploadThing component for upload.

## Rate Limiting

Contact form: max 1 message per IP per 5 minutes via rate limiting check in Server Action.
