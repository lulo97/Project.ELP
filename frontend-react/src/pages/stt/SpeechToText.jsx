import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/Button";
import { stt } from "../../services/stt";
import { encodeWAV, blobToBase64 } from "../../utils/audioUtils";

export function SpeechToText() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [canRecord, setCanRecord] = useState(false); // new state

  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const processorNodeRef = useRef(null);
  const audioDataRef = useRef([]);
  const recordingTimerRef = useRef(null);

  // Run only in browser
  useEffect(() => {
    let tries = 0;
    const maxTries = 5; // e.g. try up to 5 times
    const interval = setInterval(() => {
      if (
        typeof navigator !== "undefined" &&
        navigator.mediaDevices?.getUserMedia
      ) {
        setCanRecord(true);
        clearInterval(interval);
      } else {
        tries++;
        if (tries >= maxTries) {
          clearInterval(interval);
          setCanRecord(false);
        }
      }
    }, 1000); // check every 0.5s

    return () => clearInterval(interval);
  }, []);

  const startRecording = async () => {
    if (!canRecord) {
      setError("Audio recording is not supported in this environment.");
      return;
    }

    try {
      setError(null);
      setText("");
      setRecordingTime(0);
      audioDataRef.current = [];

      audioContextRef.current = new AudioContext();
      const audioContext = audioContextRef.current;

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      sourceNodeRef.current = audioContext.createMediaStreamSource(
        mediaStreamRef.current
      );

      processorNodeRef.current = audioContext.createScriptProcessor(4096, 1, 1);
      const processorNode = processorNodeRef.current;

      processorNode.onaudioprocess = (e) => {
        audioDataRef.current.push(
          new Float32Array(e.inputBuffer.getChannelData(0))
        );
      };

      sourceNodeRef.current.connect(processorNode);
      processorNode.connect(audioContext.destination);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      setRecording(true);
    } catch (err) {
      setError(`Error starting recording: ${err.message}`);
      console.error("Recording error:", err);
    }
  };

  const stopRecording = async () => {
    if (!audioContextRef.current || !mediaStreamRef.current) return;

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    if (processorNodeRef.current) processorNodeRef.current.disconnect();
    if (sourceNodeRef.current) sourceNodeRef.current.disconnect();

    mediaStreamRef.current.getTracks().forEach((track) => track.stop());

    setRecording(false);
    setLoading(true); 

    try {
      const wavBlob = encodeWAV(
        audioDataRef.current,
        audioContextRef.current.sampleRate
      );

      const base64String = await blobToBase64(wavBlob);
      const result = await stt({ base64: base64String });
      setText(result.data.text);
    } catch (err) {
      setError(`Error processing speech: ${err.message}`);
      console.error("STT error:", err);
    } finally {
      setLoading(false);
      audioDataRef.current = [];
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Speaking Practice</h1>

      {/* Recording Controls */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <Button
          text={
            loading
              ? "Processing..."
              : recording
              ? `Stop Recording (${formatTime(recordingTime)})`
              : "Start Speaking"
          }
          onClick={recording ? stopRecording : startRecording}
          disabled={loading || !canRecord}
          className={recording ? "bg-red-500 hover:bg-red-600" : ""}
        />

        {!canRecord && (
          <p className="text-red-600 text-sm">
            Recording not supported in this environment.
          </p>
        )}

        {recording && (
          <div className="flex items-center gap-2 text-red-500">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-medium">
              Recording... {formatTime(recordingTime)}
            </span>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-blue-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>Processing your speech...</span>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-500 text-sm mt-2 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Results Display */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-3">Your Speech Results</h2>

        {text ? (
          <div className="space-y-3">
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
              value={text}
              readOnly
              placeholder="Your transcribed text will appear here..."
            />
            <div className="text-sm text-gray-600">
              <p>
                Words:{" "}
                {text.split(/\s+/).filter((word) => word.length > 0).length}
              </p>
              <p>Characters: {text.length}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {recording ? (
              <p>
                Speak now... Your words will appear here after you stop
                recording.
              </p>
            ) : loading ? (
              <p>Processing your speech...</p>
            ) : (
              <p>Click "Start Speaking" to begin your practice session.</p>
            )}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          Tips for Better Results:
        </h3>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Speak clearly and at a natural pace</li>
          <li>Use a quiet environment with minimal background noise</li>
          <li>Hold the microphone close to your mouth (about 6-12 inches)</li>
          <li>Practice complete sentences rather than single words</li>
        </ul>
      </div>
    </div>
  );
}
