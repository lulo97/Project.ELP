# Project Idea

A personal project designed to help learn English while being tailored for personal use.

**Features:**

* Store new words, idioms, phrases, and notes.
* Learn new vocabulary with parts of speech and example sentences.
* Practice with multiple question types, including:

  * Multiple choice
  * Fill-in-the-blank
  * Sentence creation from a given word
  * Listening exercises using YouTube audio.
* Integrate text-to-speech (TTS) and speech-to-text (STT) services.
* Use a Large Language Model (LLM) for natural language tasks such as:

  * Summarization
  * Question answering
  * Proper noun extraction

---

# Technology Stack

* **Frontend:** React, JavaScript
* **Backend:** Express, Python
* **Deployment:** Docker, Nginx

---

# Services

* **ELP.Application:** Main application source code, including frontend and backend.
* **ELP.YoutubeService:**

  * Stores YouTube audio files in MP3 format.
  * Provides an open API for fetching transcripts.
  * Supports base64 encoding and audio streaming.
* **ELP.PostgreSQL:** Primary database for storing entities like words, users, events, etc.
* **ELP.Redis:** Caches infrequently changing data.
* **ELP.Whisper:** OpenAI Whisper container providing speech-to-text services.
* **ELP.Piper:** PiperTTS container providing text-to-speech services.
* **ELP.LLama:** LLM API backend using `llama.cpp`.