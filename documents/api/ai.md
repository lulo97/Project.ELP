# AI API

## Endpoint

`POST /api/ai`

## Request Body

```json
{
  "input": {
    /* Object */
  },
  "feature": "string",
  "event_id": "string"
}
```

## Response

```json
{
  "data": {
    /* Object, structure depends on feature */
  },
  "error": "string"
}
```

## Features

### 1. `SYNONYMS`

- **Input**:

  ```json
  { "word": "string" }
  ```

- **Output**:

  ```json
  ["string", "string", ...]
  ```

### 2. `GENERATE_QUESTION`

- **Input**:

  ```json
  { "context": "string" }
  ```

- **Output**:

  ```json
  { "question": "string", "answer": "string" }
  ```

### 3. `GENERATE_MCQ`

- **Input**:

  ```json
  { "context": "string" }
  ```

- **Output**:

  ```json
  {
    "question": "string",
    "choices": ["string", "string", ...],
    "correct_answer": "string"
  }
  ```

### 4. `GENERATE_REVIEW`

- **Input**:

  ```json
  { "context": "string", "question": "string", "answer": "string" }
  ```

- **Output**:

  ```json
  {
    "verdict": "string",
    "reason": "string",
    "correct_answer": "string"
  }
  ```

### 5. `GRAMMAR`

- **Input**:

  ```json
  { "text": "string" }
  ```

- **Output**:

  ```json
  [
    {
      "sentence": "string",
      "corrected": "string",
      "explanations": ["string", "string", ...]
    },
    ...
  ]
  ```

### 6. `SUMMARY`

- **Input**:

  ```json
  { "context": "string" }
  ```

- **Output**:

  ```json
  "string"
  ```

### 7. `FILL_IN_BLANK`

- **Input**:

  ```json
  { "context": "string" }
  ```

- **Output**:

  ```json
  {
    "original_context": "string",
    "context": "string",
    "word": "string"
  }
  ```
