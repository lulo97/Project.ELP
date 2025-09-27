import { useState, useRef } from "react";
import { Button } from "../../components/Button";
import { stt } from "../../services/stt";
import { encodeWAV, blobToBase64 } from "../../utils/audioUtils";

export function SpeechToText() {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");

  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const processorNodeRef = useRef(null);
  const audioDataRef = useRef([]);

  const startRecording = async () => {
    try {
      setError(null);
      setText("");
      audioDataRef.current = [];

      // Create new audio context
      audioContextRef.current = new AudioContext();
      const audioContext = audioContextRef.current;

      // Get user media
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      // Create audio nodes
      sourceNodeRef.current = audioContext.createMediaStreamSource(
        mediaStreamRef.current
      );
      
      processorNodeRef.current = audioContext.createScriptProcessor(4096, 1, 1);
      const processorNode = processorNodeRef.current;

      // Handle audio processing
      processorNode.onaudioprocess = (e) => {
        audioDataRef.current.push(
          new Float32Array(e.inputBuffer.getChannelData(0))
        );
      };

      // Connect nodes
      sourceNodeRef.current.connect(processorNode);
      processorNode.connect(audioContext.destination);

      setRecording(true);
    } catch (err) {
      setError(`Error starting recording: ${err}`);
      console.error("Recording error:", err);
    }
  };

  const stopRecording = async () => {
    if (!audioContextRef.current || !mediaStreamRef.current) return;

    // Disconnect nodes and stop tracks
    if (processorNodeRef.current) {
      processorNodeRef.current.disconnect();
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
    }
    
    mediaStreamRef.current.getTracks().forEach(track => track.stop());

    // Encode to WAV and convert to base64 using pure functions
    const wavBlob = encodeWAV(
      audioDataRef.current, 
      audioContextRef.current.sampleRate
    );
    
    const base64String = await blobToBase64(wavBlob);
    const result = await stt({ base64: base64String });
    setText(result.data.text);

    // Reset state
    audioDataRef.current = [];
    setRecording(false);
  };

  return (
    <div className="p-4">
      <Button
        text={recording ? "Stop Recording" : "Start Recording"}
        onClick={recording ? stopRecording : startRecording}
      />
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <h2>Base64 WAV Output</h2>
        <textarea 
          className="w-full h-40" 
          value={text} 
          readOnly 
          placeholder="Base64 encoded WAV will appear here after recording..."
        />
      </div>
    </div>
  );
}