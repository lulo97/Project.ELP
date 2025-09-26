CREATE TABLE IF NOT EXISTS "part_of_speechs" (
	"id"	TEXT,
	"name"	TEXT NOT NULL CHECK(id <> '') UNIQUE,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "meanings" (
	"id"	TEXT,
	"meaning"	TEXT NOT NULL CHECK(meaning <> ''),
	"word"	TEXT NOT NULL CHECK(word <> ''),
	"part_of_speech"	TEXT NOT NULL CHECK(part_of_speech <> ''),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "words" (
	"id"	TEXT,
	"word"	TEXT NOT NULL CHECK(word <> '') UNIQUE,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "sources" (
	"id"	TEXT,
	"source"	TEXT NOT NULL CHECK(source <> ''),
	"name"	TEXT NOT NULL CHECK(name <> ''),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "examples" (
	"id"	TEXT,
	"word"	TEXT NOT NULL CHECK(word <> ''),
	"part_of_speech"	TEXT NOT NULL CHECK(part_of_speech <> ''),
	"example"	TEXT NOT NULL CHECK(example <> ''),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "phrases" (
	"id"	TEXT,
	"phrase"	TEXT NOT NULL CHECK("phrase" <> ''),
	"meaning"	TEXT NOT NULL CHECK("meaning" <> ''),
	"example"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "writing_questions" (
	"id"	TEXT,
	"question"	TEXT NOT NULL CHECK(question <> ''),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "writing_answers" (
	"id"	TEXT,
	"question_id"	TEXT NOT NULL CHECK(question_id <> ''),
	"answer"	TEXT NOT NULL CHECK(answer <> ''),
	"review"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE idioms (
	id	TEXT,
	idiom	TEXT NOT NULL CHECK(idiom <> ''),
	meaning	TEXT NOT NULL CHECK(meaning <> ''),
	example	TEXT,
	PRIMARY KEY(id)
);
