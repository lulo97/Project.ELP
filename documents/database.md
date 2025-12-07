# [Entity Relationships Diagram](./documents/images/erd.png)

# Tables 

```sql
CREATE TABLE consts (
    key text,
    value text,
    visible boolean DEFAULT false NOT NULL,
    CONSTRAINT consts_visible_not_empty CHECK (visible IS NOT NULL)
);

CREATE TABLE examples (
    id text NOT NULL,
    word text NOT NULL,
    part_of_speech text NOT NULL,
    example text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT examples_id_not_empty CHECK (id <> ''),
    CONSTRAINT examples_word_not_empty CHECK (word <> ''),
    CONSTRAINT examples_part_of_speech_not_empty CHECK (part_of_speech <> ''),
    CONSTRAINT examples_example_not_empty CHECK (example <> ''),
    CONSTRAINT examples_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT examples_pkey PRIMARY KEY (id)
);

CREATE TABLE idioms (
    id text NOT NULL,
    idiom text NOT NULL,
    meaning text NOT NULL,
    example text,
    user_id text NOT NULL,
    CONSTRAINT idioms_id_not_empty CHECK (id <> ''),
    CONSTRAINT idioms_idiom_not_empty CHECK (idiom <> ''),
    CONSTRAINT idioms_meaning_not_empty CHECK (meaning <> ''),
    CONSTRAINT idioms_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT idioms_pkey PRIMARY KEY (id)
);

CREATE TABLE log (
    id text NOT NULL,
    created_at timestamp WITHOUT time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    text text NOT NULL,
    CONSTRAINT log_id_not_empty CHECK (id <> ''),
    CONSTRAINT log_created_at_not_empty CHECK (created_at IS NOT NULL),
    CONSTRAINT log_text_not_empty CHECK (text <> ''),
    CONSTRAINT log_pkey PRIMARY KEY (id)
);

CREATE TABLE meanings (
    id text NOT NULL,
    meaning text NOT NULL,
    word text NOT NULL,
    part_of_speech text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT id_not_empty CHECK (id <> ''),
    CONSTRAINT meaning_not_empty CHECK (meaning <> ''),
    CONSTRAINT word_not_empty CHECK (word <> ''),
    CONSTRAINT part_of_speech_not_empty CHECK (part_of_speech <> ''),
    CONSTRAINT user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT meanings_pkey PRIMARY KEY (id)
);

CREATE TABLE part_of_speechs (
    id text,
    name text
);

CREATE TABLE phrases (
    id text NOT NULL,
    phrase text NOT NULL,
    meaning text NOT NULL,
    example text,
    user_id text NOT NULL,
    CONSTRAINT phrases_id_not_empty CHECK (id <> ''),
    CONSTRAINT phrases_phrase_not_empty CHECK (phrase <> ''),
    CONSTRAINT phrases_meaning_not_empty CHECK (meaning <> ''),
    CONSTRAINT phrases_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT phrases_pkey PRIMARY KEY (id)
);

CREATE TABLE posts (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT posts_id_not_empty CHECK (id <> ''),
    CONSTRAINT posts_title_not_empty CHECK (title <> ''),
    CONSTRAINT posts_content_not_empty CHECK (content <> ''),
    CONSTRAINT posts_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT posts_pkey PRIMARY KEY (id)
);

CREATE TABLE source_translates (
    id text NOT NULL,
    chunk text NOT NULL,
    translate text NOT NULL,
    source_id text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT source_translates_id_not_empty CHECK (id <> ''),
    CONSTRAINT source_translates_chunk_not_empty CHECK (chunk <> ''),
    CONSTRAINT source_translates_translate_not_empty CHECK (translate <> ''),
    CONSTRAINT source_translates_source_id_not_empty CHECK (source_id <> ''),
    CONSTRAINT source_translates_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT source_translates_pkey PRIMARY KEY (id)
);

CREATE TABLE sources (
    id text NOT NULL,
    source text NOT NULL,
    name text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT sources_id_not_empty CHECK (id <> ''),
    CONSTRAINT sources_source_not_empty CHECK (source <> ''),
    CONSTRAINT sources_name_not_empty CHECK (name <> ''),
    CONSTRAINT sources_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT sources_pkey PRIMARY KEY (id)
);

CREATE TABLE speaking_scores (
    id text NOT NULL,
    speaking_id text,
    score numeric,
    text_listened text,
    text text,
    CONSTRAINT speaking_scores_pk PRIMARY KEY (id)
);

CREATE TABLE speakings (
    id text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT speakings_id_not_empty CHECK (id <> ''),
    CONSTRAINT speakings_question_not_empty CHECK (question <> ''),
    CONSTRAINT speakings_answer_not_empty CHECK (answer <> ''),
    CONSTRAINT speakings_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT speakings_pk PRIMARY KEY (id)
);

CREATE TABLE synonyms (
    id text NOT NULL,
    word text NOT NULL,
    synonym text NOT NULL,
    note text,
    user_id text NOT NULL,
    CONSTRAINT synonyms_id_not_empty CHECK (id <> ''),
    CONSTRAINT synonyms_word_not_empty CHECK (word <> ''),
    CONSTRAINT synonyms_synonym_not_empty CHECK (synonym <> ''),
    CONSTRAINT synonyms_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT synonyms_pkey PRIMARY KEY (id)
);

CREATE TABLE tts (
    id text NOT NULL,
    text text,
    audio_base64 text,
    CONSTRAINT tts_id_not_empty CHECK (id <> ''),
    CONSTRAINT tts_pk PRIMARY KEY (id)
);

CREATE TABLE users (
    id text NOT NULL,
    username text NOT NULL,
    email text,
    password_hash text NOT NULL,
    full_name text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_id_not_empty CHECK (id <> ''),
    CONSTRAINT users_username_not_empty CHECK (username <> ''),
    CONSTRAINT users_password_hash_not_empty CHECK (password_hash <> ''),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE words (
    id text NOT NULL,
    word text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT words_id_not_empty CHECK (id <> ''),
    CONSTRAINT words_word_not_empty CHECK (word <> ''),
    CONSTRAINT words_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT words_pkey PRIMARY KEY (id)
);

CREATE TABLE writing_answers (
    id text NOT NULL,
    question_id text NOT NULL,
    answer text NOT NULL,
    review text,
    user_id text NOT NULL,
    CONSTRAINT writing_answers_id_not_empty CHECK (id <> ''),
    CONSTRAINT writing_answers_question_id_not_empty CHECK (question_id <> ''),
    CONSTRAINT writing_answers_answer_not_empty CHECK (answer <> ''),
    CONSTRAINT writing_answers_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT writing_answers_pk PRIMARY KEY (id)
);

CREATE TABLE writing_questions (
    id text NOT NULL,
    question text NOT NULL,
    user_id text NOT NULL,
    CONSTRAINT writing_questions_id_not_empty CHECK (id <> ''),
    CONSTRAINT writing_questions_question_not_empty CHECK (question <> ''),
    CONSTRAINT writing_questions_user_id_not_empty CHECK (user_id <> ''),
    CONSTRAINT writing_questions_pk PRIMARY KEY (id)
);
```