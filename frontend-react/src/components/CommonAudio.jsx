import { useState, useEffect } from "react";
import { tts } from "../services/tts";
import { removeVietnameseDiacritics } from "../utils/removeVietnameseDiacritics";
import { message } from "../providers/MessageProvider"

export function CommonAudio({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);

  async function handleSpeak() {
    try {
      const result = await tts(removeVietnameseDiacritics(text));

      if (result.error) {
        message({ type: "error", text: result.error })
        return;
      }

      const audio_base64 = result.data.audio_base64;

      const audioBytes = Uint8Array.from(atob(audio_base64), (c) =>
        c.charCodeAt(0)
      );
      const audioBlob = new Blob([audioBytes], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new window.Audio(audioUrl);

      // when playing starts
      setIsPlaying(true);

      // when playback ends
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("pause", () => setIsPlaying(false));

      audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setIsPlaying(false);
    }
  }

  return (
    <button
      onClick={handleSpeak}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-gray-600 hover:text-blue-500 transition-colors"
      aria-label="Play Audio"
    >
      <span className="text-xl">{isPlaying ? "🔊" : "🔈"}</span>
    </button>
  );
}
