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
* **Backend:** Express, Python, C#
* **Deployment:** Docker, Nginx

---

# Services

* **ELP.FrontendReact:** Main application UI source code using React primary.
- Using Tailwind for css style
- Creating UI components from scratch in /components folder
- Design responsive UI and allow changing application display language

* **ELP.BackendExpress:** Main application bussiness source code using ExpressJS primary.
- Main logic code written in PL/SQL of PosgreSQL
- ExpressJS calling procedure and expected output { p_rows: [], p_error: "" } as output

* **ELP.BackendDotnet:** Main application bussiness source code using Dotnet WebApi primary.
- Integrate EF framework and LINQ to writing logic code interact with database

* **ELP.Utils:**
  - Youtube utils:
    * Stores YouTube audio files in MP3 format.
    * Provides an open API for fetching transcripts.
    * Supports base64 encoding and audio streaming.
  - Speech to text utils using OpenAI Whisper
  - Text to speech utils using PiperTTS 
  - LLM API backend using llama.cpp

* **ELP.PostgreSQL:** Primary database for storing entities like words, users, events, etc.

* **ELP.Redis:** Caches infrequently changing data like consts table