# House Rent System — API Reference

Base URL: `http://localhost:5000/api`

All responses use JSON. Success responses include `success: true` and a `data` or `message` field. Errors include `success: false` and `message`.

---

## Auth

### POST /auth/register

Register a new user.

**Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 6)",
  "phone": "string (optional)",
  "role": "user | owner | admin (optional, default: user)"
}
```

**Response:** `{ success, token, user }`

---

### POST /auth/login

Login and get JWT.

**Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:** `{ success, token, user }`

---

### GET /auth/me

Get current user. Requires `Authorization: Bearer <token>`.

**Response:** `{ success, user }`

---

## Stats

### GET /stats

Public. Returns aggregate counts (no auth).

**Response:** `{ success, data: { totalProperties, totalCities } }`

- **totalProperties:** count of available properties.
- **totalCities:** count of distinct `address.city` values among available properties.

---

## Properties

### GET /properties/types

Public. Returns allowed property types from schema (no auth).

**Response:** `{ success, data: string[] }` (e.g. `["apartment", "house", "villa", "studio", "room"]`)

---

### GET /properties

List properties with optional filters.

**Query:** `city`, `type`, `minRent`, `maxRent`, `bedrooms`, `search`, `page`, `limit`

**Response:** `{ success, data: Property[], pagination: { page, limit, total, pages } }`

---

### GET /properties/my

List current user's properties. Requires auth.

**Response:** `{ success, data: Property[] }`

---

### GET /properties/:id

Get single property by ID.

**Response:** `{ success, data: Property }`

---

### POST /properties

Create property. Requires auth.

**Body:** See Property model (title, description, type, address, rent, bedrooms, bathrooms, area, amenities, images, isAvailable).

**Response:** `{ success, data: Property }`

---

### PUT /properties/:id

Update property. Requires auth; only owner can update.

**Body:** Same as create (all fields optional for update).

**Response:** `{ success, data: Property }`

---

### DELETE /properties/:id

Delete property. Requires auth; only owner can delete.

**Response:** `{ success, message }`

---

## Property model

- **title** (string, required)
- **description** (string)
- **type** (enum: apartment, house, villa, studio, room)
- **address** (object: street, city, state, pincode — city required)
- **rent** (number, required)
- **bedrooms**, **bathrooms** (number, default 1)
- **area** (number, sqft)
- **amenities** (array of strings)
- **images** (array of URLs)
- **isAvailable** (boolean, default true)
- **owner** (ObjectId, set by server)
