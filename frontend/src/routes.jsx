import React from "react";

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
import { Synonym } from "./pages/synonym/Synonym";
import { ReadWordList } from "./pages/read_word_list/ReadWordList";
import { Post } from "./pages/post/Post";
import { ViewPost } from "./pages/post/ViewPost";
import { QuestionGenerator } from "./pages/question_generator/QuestionGenerator";
import { SignUp } from "./pages/signup/SignUp";
import { LogIn } from "./pages/login/Login";

export const routes = [
  {
    name: "Library",
    isAuth: true,
    children: [
      { name: "Word", path: "word", element: <Word /> },
      { name: "Source", path: "source", element: <Source /> },
      { name: "Meaning", path: "meaning", element: <Meaning /> },
      { name: "Example", path: "example", element: <Example /> },
      { name: "Phrase", path: "phrase", element: <Phrase /> },
      { name: "Idiom", path: "idiom", element: <Idiom /> },
      { name: "Synonym", path: "synonym", element: <Synonym /> },
      { name: "Post", path: "post", element: <Post /> },
    ],
  },

  {
    name: "Features",
    children: [
      { name: "Exercise", path: "exercise", element: <Exercise /> },
      {
        name: "QuestionGenerator",
        path: "question_generator",
        element: <QuestionGenerator />,
      },
    ],
  },

  {
    name: "Reading",
    children: [],
  },
  {
    name: "Listening",
    children: [],
  },
  {
    name: "Writing",
    children: [
      { name: "Grammar", path: "grammar", element: <Grammar /> },
      {
        name: "WritingQuestion",
        path: "writing_question",
        element: <WritingQuestion />,
      },
    ],
  },
  {
    name: "Speaking",
    children: [
      {
        name: "SpeechToText",
        path: "speech_to_text",
        element: <SpeechToText />,
      },
      { name: "Speaking", path: "speaking", element: <Speaking /> },
      {
        name: "SpeakingExercise",
        path: "speaking_exercise",
        element: <SpeakingExercise />,
        isNotDisplayOnHeader: true,
      },
    ],
  },
  {
    name: "ViewPost",
    path: "viewpost",
    element: <ViewPost />,
    isNotDisplayOnHeader: true,
  },
  { name: "Read", path: "read", element: <Read />, isNotDisplayOnHeader: true },
  {
    name: "ReadSentence",
    path: "read_sentence",
    element: <ReadSentence />,
    isNotDisplayOnHeader: true,
  },
  {
    name: "ReadWordList",
    path: "read_word_list",
    element: <ReadWordList />,
    isNotDisplayOnHeader: true,
  },

  {
    name: "Writing",
    path: "writing",
    element: <Writing />,
    isNotDisplayOnHeader: true,
  },

  {
    name: "SignUp",
    path: "signup",
    element: <SignUp />,
    isNotDisplayOnHeader: true,
  },
  {
    name: "Login",
    path: "login",
    element: <LogIn />,
    isNotDisplayOnHeader: true,
  },
];
