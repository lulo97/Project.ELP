import { Example } from "./pages/examples/Example";
import { Meaning } from "./pages/meaning/Meaning";
import { Phrase } from "./pages/phrase/Phrase";
import { Read } from "./pages/read/Read";
import { Source } from "./pages/source/Source";
import { Word } from "./pages/word/Word";

export const routes = [
    { name: "Word", path: "word", element: <Word /> },
    { name: "Source", path: "source", element: <Source /> },
    { name: "Read", path: "read", element: <Read /> },
    { name: "Meaning", path: "meaning", element: <Meaning /> },
    { name: "Example", path: "example", element: <Example /> },
    { name: "Phrase", path: "phrase", element: <Phrase /> },
]