# Words API Design

## Base URL

```
/api/words
```

---

## Authentication
All endpoints require authentication via cookie token. Parse token to extract `user_id` to insert/update in `WORDS` table.

---

# GET /api/words
Retrieve list of words for the authenticated user.

### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `word` | string | No | Filter by word text |
| `where_options` | JSON Array | No | Extra conditions (e.g. `[{"field":"word","comparison_operation":"="}]`) |
| `page` | number | No | Current page (handled by middleware) |
| `pageSize` | number | No | Page size (handled by middleware) |

- comparison_operation = "=" used for Read page
- comparison_operation = "LIKE" used for searching in Word page

### Response
```json
{
  "error": null,
  "data": [
    {
      "id": "string",
      "word": "string",
      "username": "string"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

---

# POST /api/words

Create a new word.

### Body

```json
{
  "word": "example"
}
```

### Response

```json
{
  "error": null,
  "data": {
    "id": "generated-id",
    "word": "example"
  }
}
```

---

# PUT /api/words/:id

Update an existing word.

### Params

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `id` | string | Word ID     |

### Body

```json
{
  "word": "updated-value"
}
```

### Response

```json
{
  "error": null,
  "data": {
    "id": "id",
    "word": "updated-value"
  }
}
```

---

# DELETE /api/words/:id

Delete a word.

### Params

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `id` | string | Word ID     |

### Response

```json
{
  "error": null,
  "data": {
    "id": "id"
  }
}
```