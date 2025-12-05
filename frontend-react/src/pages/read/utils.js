import { ALLOW_SELECTED } from "../../hooks/useSelectedText";

export const EMPTY_STATE = {
  words: [],
  idioms: [],
  phrases: [],
  meanings: [],
  source_translates: [],
  source_row: {
    id: null,
    source: null,
    name: null,
    user_id: null,
  },
  word_row: {
    id: null,
    word: null,
    user_id: null,
  },
  open_popup: false,
  original_chunks: [],
  chunks: [],
  show_translate:
    localStorage.getItem("show_translate") === "true",
  horizontal_layout:
    localStorage.getItem("horizontal_layout") === "true",
  trigger: 0,
  selectedTextDoubleClick: ""
};

export function compareObjects(obj1, obj2) {
  const string_obj1 = JSON.stringify(obj1.toSorted());
  const string_obj2 = JSON.stringify(obj2.toSorted());
  return string_obj1 === string_obj2;
}

export function transformSourceRawIntoChunks(
  api_response = {
    source_row: EMPTY_STATE.source_row,
    source_translates: EMPTY_STATE.source_translates,
  }
) {
  // <p>Hello <br>  <br> world</p> -> [Hello, World]
  // <p>Hello <br><br> world</p> -> [Hello, World]
  // <p>Hello <br>  \n world</p> -> [Hello, World]
  // <p>Hello \n \n world</p> -> [Hello, World]
  function transformText(a) {
    let b = a;
    b = b.replace(/\n/g, "<br>");
    b = b.replaceAll("<p>", " ").replaceAll("</p>", " ");
    const c = b.split(/<\s*br\s*>\s*<\s*br\s*>/i);
    return c;
  }

  let chunks = transformText(api_response.source_row.source)

  // [Hello, World] -> [<p>Hello</p>, <p>World</p>]
  chunks = chunks.map((ele) => ({
    chunk: `<p class=${ALLOW_SELECTED}>${ele
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")}</p>`,
    translate: "",
  }));

  /*
    "source_translates": [
      {
          "id": "202511291529399362",
          "chunk": "<p class=ALLOW_SELECTED>Apache Ant is a Java library and command-line tool whose mission is to drive processes described in build files as targets and extension points dependent upon each other. The main known usage of Ant is the build of Java applications. Ant supplies a number of built-in tasks allowing to compile, assemble, test and run Java applications. Ant can also be used effectively to build non Java applications, for instance C or C++ applications. More generally, Ant can be used to pilot any type of process which can be described in terms of targets and tasks.</p>",
          "translate": "ffff",
          "source_id": "202511171827342965",
          "user_id": "202511052219372973"
      }
    ],
    */
  if (api_response.source_translates.length > 0) {
    chunks = chunks.map((ele) => {
      const existing_translate = api_response.source_translates.find(
        (x) => x.chunk === ele.chunk
      );
      return {
        ...ele,
        translate: existing_translate ? existing_translate.translate : "",
      };
    });
  }

  return chunks;
}

// function getWordColor({ type, word, words }) {
//   const consts = getConsts();
//   if (type === "idiom") return consts.IDIOM_COLOR;
//   if (type === "phrase") return consts.PHRASE_COLOR;
//   if (type === "word") {
//     const standardized = getStandardizeWord({ word: word });
//     return words.map(ele => ele.word).includes(standardized) ? consts.WORD_COLOR : "black";
//   }
//   return "black";
// }