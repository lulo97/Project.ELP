import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getSpeakingsById } from "../../services/speakings";
import { Button } from "../../components/Button";
import { similarityScore } from "../../utils/similarityScore";
import { tts } from "../../services/tts";
import { stt } from "../../services/stt";
import { removeVietnameseDiacritics } from "../../utils/removeVietnameseDiacritics";
import { encodeWAV, blobToBase64 } from "../../utils/audioUtils";
import {
  addSpeakingScore,
  getSpeakingScore,
} from "../../services/speaking_score";
import { useMessage } from "../../providers/MessageProvider";
import { Tooltip } from "../../components/Tooltip";

export function SpeakingExercise() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const speaking_id = queryParams.get("speaking_id");

  const [speakingData, setSpeakingData] = useState({
    id: "",
    question: "",
    answer: "",
  });

  const [recording, setRecording] = useState(false);
  const [recordTarget, setRecordTarget] = useState(null); // "question" or "answer"
  const [scores, setScores] = useState({ question: null, answer: null });
  const [spokenTexts, setSpokenTexts] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsAudios, setTtsAudios] = useState({ question: null, answer: null });
  const [isPlaying, setIsPlaying] = useState({
    question: false,
    answer: false,
  });
  const [scoreData, setScoreData] = useState([]);

  function refresh() {
    setScores({ question: null, answer: null });
    setSpokenTexts({ question: "", answer: "" });
    setTtsAudios({ question: null, answer: null });
    setIsPlaying({ question: false, answer: false });
    setRecording(false);
    setRecordTarget(null);
    fetchScoreData();
  }

  const { fireMessage } = useMessage();

  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const processorNodeRef = useRef(null);
  const audioDataRef = useRef([]);

  async function fetchSpeakingData() {
    const result = await getSpeakingsById({ id: speaking_id });
    setSpeakingData(result);
  }

  async function fetchScoreData() {
    const result = await getSpeakingScore({ speaking_id: speaking_id });
    setScoreData(result || []);
  }

  useEffect(() => {
    fetchSpeakingData();
    fetchScoreData();
  }, []);

  // --- Preload TTS once when data ready ---
  useEffect(() => {
    async function preloadTTS() {
      if (!speakingData.question && !speakingData.answer) return;
      setTtsLoading(true);

      try {
        const questionAudio = await generateAudio(speakingData.question);
        const answerAudio = await generateAudio(speakingData.answer);
        setTtsAudios({ question: questionAudio, answer: answerAudio });
      } catch (err) {
        console.error("TTS preload error:", err);
      } finally {
        setTtsLoading(false);
      }
    }

    preloadTTS();
  }, [speakingData]);

  // --- Speech to Text ---
  async function startRecording(target) {
    setRecordTarget(target);
    setRecording(true);
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
  }

  async function stopRecording() {
    setRecording(false);

    if (processorNodeRef.current) processorNodeRef.current.disconnect();
    if (sourceNodeRef.current) sourceNodeRef.current.disconnect();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());

    setLoading(true);
    try {
      const wavBlob = encodeWAV(
        audioDataRef.current,
        audioContextRef.current.sampleRate
      );
      const base64String = await blobToBase64(wavBlob);

      const result = await stt({ base64: base64String });
      const spokenText = result.data.text;

      const original =
        recordTarget === "question"
          ? speakingData.question
          : speakingData.answer;

      const score = similarityScore(original, spokenText);

      setSpokenTexts((prev) => ({ ...prev, [recordTarget]: spokenText }));
      setScores((prev) => ({ ...prev, [recordTarget]: score }));
    } catch (err) {
      console.error("STT error:", err);
    } finally {
      setLoading(false);
      audioDataRef.current = [];
    }
  }

  // --- Generate Audio once ---
  async function generateAudio(text) {
    const result = await tts(removeVietnameseDiacritics(text));
    const audio_base64 = result.data.audio_base64;

    const audioBytes = Uint8Array.from(atob(audio_base64), (c) =>
      c.charCodeAt(0)
    );
    const audioBlob = new Blob([audioBytes], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    return new Audio(audioUrl);
  }

  // --- Play / Stop cached audio ---
  function togglePlay(type) {
    const audio = ttsAudios[type];
    if (!audio) return;

    if (!isPlaying[type]) {
      audio.play();
      setIsPlaying((prev) => ({ ...prev, [type]: true }));

      audio.onended = () => {
        setIsPlaying((prev) => ({ ...prev, [type]: false }));
      };
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying((prev) => ({ ...prev, [type]: false }));
    }
  }

  if (!speaking_id) return <div>No exercise selected!</div>;

  let average_question_score = 0;
  let average_answer_score = 0;

  if (scoreData && scoreData.length > 0) {
    average_question_score =
      scoreData.reduce((sum, value) => sum + value.question_score, 0) /
      scoreData.length;
    average_question_score = Math.round(average_question_score * 100) / 100;

    average_answer_score =
      scoreData.reduce((sum, value) => sum + value.answer_score, 0) /
      scoreData.length;
    average_answer_score = Math.round(average_answer_score * 100) / 100;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Speaking Practice</h1>
        <Button
          text={"Save"}
          onClick={async () => {
            const body = {
              speaking_id: speaking_id,
              question_score: scores.question,
              answer_score: scores.answer,
              question_listened: spokenTexts.question,
              answer_listened: spokenTexts.answer,
            };

            if (!body.speaking_id) {
              fireMessage({
                text: "Speaking id cannot be empty!",
                type: "error",
              });
              return;
            }

            // optional: validate other fields
            if (body.question_score == null || body.answer_score == null) {
              fireMessage({ text: "Scores cannot be empty!", type: "error" });
              return;
            }

            if (
              body.question_listened == null ||
              body.answer_listened == null
            ) {
              fireMessage({
                text: "Listened text cannot be empty!",
                type: "error",
              });
              return;
            }

            const result = await addSpeakingScore({ row: body });

            if (!result.error) {
              fireMessage({
                text: "Save succesfully!",
              });
              refresh();
            } else {
              fireMessage({
                text: result.error,
                type: "error",
              });
            }
          }}
        />
      </div>

      {ttsLoading && (
        <p className="text-blue-500">Generating audio... please wait</p>
      )}

      {/* Question */}
      <div className="p-4 border rounded-lg shadow">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">Question</h2>
          <Tooltip
            content={
              scoreData && scoreData.length > 0
                ? scoreData.slice(0, 5).map((ele) => {
                    return (
                      <div>{ele.created_time + " | " + ele.question_score}</div>
                    );
                  })
                : "No data"
            }
            delay={100}
          >
            <div className="text-sm text-green-600 font-bold">
              {average_question_score} / 100
            </div>
          </Tooltip>
        </div>
        <p className="mb-2">{speakingData.question}</p>
        <div className="flex space-x-4">
          <Button
            text={isPlaying.question ? "⏹ Stop listen" : "🔊 Listen"}
            onClick={() => togglePlay("question")}
          />
          {!recording || recordTarget !== "question" ? (
            <Button
              text="🎤 Record"
              onClick={() => startRecording("question")}
            />
          ) : (
            <Button text="⏹ Stop" onClick={stopRecording} />
          )}
        </div>
        {spokenTexts.question && (
          <p className="mt-2">You spoke: {spokenTexts.question}</p>
        )}
        {scores.question !== null && (
          <p className="mt-2 text-green-600">
            Your score: {scores.question}/100
          </p>
        )}
      </div>

      {/* Answer */}
      <div className="p-4 border rounded-lg shadow">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">Answer</h2>
          <Tooltip
            content={
              scoreData && scoreData.length > 0
                ? scoreData.slice(0, 5).map((ele) => {
                    return (
                      <div>{ele.created_time + " | " + ele.answer_score}</div>
                    );
                  })
                : "No data"
            }
            delay={100}
          >
            <div className="text-sm text-green-600 font-bold">
              {average_answer_score} / 100
            </div>
          </Tooltip>
        </div>
        <p className="mb-2">{speakingData.answer}</p>
        <div className="flex space-x-4">
          <Button
            text={isPlaying.answer ? "⏹ Stop listen" : "🔊 Listen"}
            onClick={() => togglePlay("answer")}
          />
          {!recording || recordTarget !== "answer" ? (
            <Button text="🎤 Record" onClick={() => startRecording("answer")} />
          ) : (
            <Button text="⏹ Stop" onClick={stopRecording} />
          )}
        </div>
        {spokenTexts.answer && (
          <p className="mt-2">You spoke: {spokenTexts.answer}</p>
        )}
        {scores.answer !== null && (
          <p className="mt-2 text-green-600">Your score: {scores.answer}/100</p>
        )}
      </div>

      {loading && <p className="text-blue-500">Processing speech...</p>}
    </div>
  );
}
