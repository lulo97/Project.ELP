
# Table CONSTS
| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| key | text |  | YES | NO | yyyy |
| value | text |  | YES | NO |  |

# Table EVENTS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| timestamp | text |  | YES | NO |  |
| status | text |  | YES | NO |  |
| data | text |  | YES | NO |  |

# Table EVENTS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| timestamp | text |  | YES | NO |  |
| status | text |  | YES | NO |  |
| data | text |  | YES | NO |  |

# Table IDIOMS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| idiom | text |  | NO | NO |  |
| meaning | text |  | NO | NO |  |
| example | text |  | YES | NO |  |
| user_id | text |  | NO | NO |  |

# Table LOG

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| created_at | timestamp without time zone |  | NO | NO |  |
| id | text | PK | NO | YES |  |
| text | text |  | NO | NO |  |

# Table MEANINGS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| meaning | text |  | NO | NO |  |
| word | text |  | NO | NO |  |
| part_of_speech | text |  | NO | NO |  |
| user_id | text |  | NO | NO |  |

# Table PART_OF_SPEECHS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| name | text |  | YES | NO |  |

# Table PHRASES

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| phrase | text |  | NO | NO |  |
| meaning | text |  | NO | NO |  |
| example | text |  | YES | NO |  |
| user_id | text |  | NO | NO |  |

# Table POSTS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| title | text |  | NO | NO |  |
| content | text |  | NO | NO |  |
| user_id | text |  | NO | NO |  |

# Table SOURCE_TRANSLATES

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| chunk | text |  | NO | NO |  |
| translate | text |  | NO | NO |  |
| source_id | text |  | NO | NO |  |
| user_id | text |  | NO | NO |  |

# Table SOURCES

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| source | text |  | NO | NO |  |
| name | text |  | NO | NO |  |
| user_id | text |  | NO | NO |  |

# Table SPEAKING SCORES

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| score | numeric |  | YES | NO |  |
| id | text |  | YES | NO |  |
| speaking_id | text |  | YES | NO |  |
| text_listened | text |  | YES | NO |  |
| text | text |  | YES | NO |  |

# Table SPEAKINGS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| question | text |  | YES | NO |  |
| answer | text |  | YES | NO |  |

# Table SYNONYMS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| word | text |  | NO | NO |  |
| synonym | text |  | NO | NO |  |
| note | text |  | YES | NO |  |
| user_id | text |  | NO | NO |  |

# Table TTS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| text | text |  | YES | NO |  |
| audio_base64 | text |  | YES | NO |  |

# Table USERS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| is_active | boolean |  | YES | NO |  |
| created_at | timestamp with time zone |  | YES | NO |  |
| email | text |  | YES | NO |  |
| id | text | PK | NO | YES |  |
| full_name | text |  | YES | NO |  |
| password_hash | text |  | NO | NO |  |
| username | text |  | NO | NO |  |

# Table WORDS
| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text | PK | NO | YES |  |
| word | text |  | NO | NO |  |
| user_id | text |  | NO | NO |  |

# Table WRITING_ANSWERS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| question_id | text |  | YES | NO |  |
| answer | text |  | YES | NO |  |
| review | text |  | YES | NO |  |

# TABLE WRITING_QUESTIONS

| Column | Type | Key | Null | IsUnique | Description |
|------------|-----------|-----|------|---------|-----------------|
| id | text |  | YES | NO |  |
| question | text |  | YES | NO |  |