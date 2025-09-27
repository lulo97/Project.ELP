import { Example } from "./pages/examples/Example";
import { Exercise } from "./pages/exercise/Exercise";
import { Grammar } from "./pages/grammar/Grammar";
import { Idiom } from "./pages/idiom/Idiom";
import { Meaning } from "./pages/meaning/Meaning";
import { Phrase } from "./pages/phrase/Phrase";
import { Read } from "./pages/read/Read";
import { Source } from "./pages/source/Source";
import { Word } from "./pages/word/Word";
import { Writing } from "./pages/writing/Writing";
import { WritingQuestion } from "./pages/writing_question/WritingQuestion";
import { SpeechToText } from "./pages/stt/SpeechToText";
import { Speaking } from "./pages/speakings/Speaking";
import { SpeakingExercise } from "./pages/speaking_exercise/SpeakingExercise";
import { ReadSentence } from "./pages/read_sentence/ReadSentence";

export const routes = [
  {
    name: "Database",
    children: [
      { name: "Word", path: "word", element: <Word /> },
      { name: "Source", path: "source", element: <Source /> },
      { name: "Meaning", path: "meaning", element: <Meaning /> },
      { name: "Example", path: "example", element: <Example /> },
      { name: "Phrase", path: "phrase", element: <Phrase /> },
      { name: "Idiom", path: "idiom", element: <Idiom /> },
    ],
  },

  { name: "Read", path: "read", element: <Read />, isNotDisplayOnHeader: true },
  { name: "ReadSentence", path: "read_sentence", element: <ReadSentence /> },
  
  { name: "Exercise", path: "exercise", element: <Exercise /> },
  {
    name: "WritingQuestion",
    path: "writing_question",
    element: <WritingQuestion />,
  },
  {
    name: "Writing",
    path: "writing",
    element: <Writing />,
    isNotDisplayOnHeader: true,
  },
  { name: "Grammar", path: "grammar", element: <Grammar /> },
  { name: "SpeechToText", path: "speech_to_text", element: <SpeechToText /> },
  { name: "Speaking", path: "speaking", element: <Speaking /> },
  {
    name: "SpeakingExercise",
    path: "speaking_exercise",
    element: <SpeakingExercise />,
    isNotDisplayOnHeader: true,
  },
];
