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

export const routes = [
    { name: "Word", path: "word", element: <Word /> },
    { name: "Source", path: "source", element: <Source /> },
    { name: "Read", path: "read", element: <Read />, isNotDisplayOnHeader: true },
    { name: "Meaning", path: "meaning", element: <Meaning /> },
    { name: "Example", path: "example", element: <Example /> },
    { name: "Phrase", path: "phrase", element: <Phrase /> },
    { name: "Exercise", path: "exercise", element: <Exercise /> },
    { name: "WritingQuestion", path: "writing_question", element: <WritingQuestion /> },
    { name: "Writing", path: "writing", element: <Writing />, isNotDisplayOnHeader: true },
    { name: "Idiom", path: "idiom", element: <Idiom /> },
    { name: "Grammar", path: "grammar", element: <Grammar /> },
    { name: "SpeechToText", path: "speech_to_text", element: <SpeechToText /> },
]