import { RichTextEditor } from "../../components/RichTextEditor";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useState } from "react";
import { Textarea } from "../../components/Textarea";
import { SplitPane } from "../../components/SplitPane";
import { Button } from "../../components/Button";
import {
  deleteWritingAnswer,
  addWritingAnswer,
  updateWritingAnswer,
} from "../../services/writing_answer";
import { useMessage } from "../../providers/MessageProvider";

export function Answer({ row, refresh, className = "" }) {
  const { fireMessage } = useMessage();

  const ORIGINAL_ANSWER = {
    id: row?.id ?? "",
    question_id: row?.question_id ?? "",
    answer: row?.answer ?? "",
    review: row?.review ?? "", // HTML string
  };

  // Initialize editor state from HTML if available
  const [editorState, setEditorState] = useState(() => {
    try {
      if (row?.review) {
        const blocksFromHtml = htmlToDraft(row.review);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHtml.contentBlocks,
          blocksFromHtml.entityMap
        );
        return EditorState.createWithContent(contentState);
      }
      return EditorState.createEmpty();
    } catch {
      return EditorState.createEmpty();
    }
  });

  const [answerData, setAnswerData] = useState(ORIGINAL_ANSWER);

  const handleChange = (state) => {
    setEditorState(state);

    const rawContent = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContent);

    setAnswerData((prev) => ({
      ...prev,
      review: html, // save HTML
    }));
  };

  async function saveAnswer() {
    if (!answerData.answer?.trim()) {
      fireMessage({ text: "Answer cannot be empty!" });
      return;
    }

    if (!answerData.question_id?.trim()) {
      fireMessage({ text: "Question ID cannot be empty!" });
      return;
    }

    let result = { data: null, error: null };

    if (!answerData.id) {
      // Add
      result = await addWritingAnswer({ row: answerData });
    } else {
      // Update
      result = await updateWritingAnswer({ row: answerData });
    }

    if (result.error) {
      fireMessage({ text: "Error saving answer: " + result.error });
    } else {
      fireMessage({ text: "Answer saved successfully!" });
      refresh();
    }
  }

  async function deleteAnswer() {
    // If this is just a temporary (unsaved) answer → remove locally
    if (!answerData.id) {
      refresh((prev) => prev.filter((a) => a !== row));
      return;
    }

    const is_confirmed = window.confirm(
      "Are you sure you want to delete this answer?"
    );
    if (!is_confirmed) return;

    const result = await deleteWritingAnswer({ row: answerData });

    if (result.error) {
      fireMessage({ text: "Error deleting answer: " + result.error });
    } else {
      fireMessage({ text: "Answer deleted successfully!" });
      refresh(); // fetch latest from backend
    }
  }

  if (!row || Object.keys(row).length === 0) {
    return <div>No answer passed</div>;
  }

  const isSaveDisabled =
    answerData.answer === ORIGINAL_ANSWER.answer &&
    answerData.review === ORIGINAL_ANSWER.review;

  return (
    <SplitPane
      actions={
        <div className="flex flex-col gap-4 h-full">
          <Button
            className="px-3 py-1 w-full"
            text={"Save"}
            onClick={saveAnswer}
            disabled={isSaveDisabled}
          />
          <Button
            className="px-3 py-1 w-full"
            text={"Delete"}
            onClick={deleteAnswer}
          />
        </div>
      }
      left={
        <Textarea
          value={answerData.answer}
          onChange={(event) => {
            setAnswerData({ ...answerData, answer: event.target.value });
          }}
          className="w-full h-full resize-none"
          placeholder="Type your answer here..."
        />
      }
      right={
        <RichTextEditor
          className="w-full h-full"
          value={editorState}
          onChange={handleChange}
          placeholder="Type your review here..."
        />
      }
      initialLeftWidth={50}
      className={className}
    />
  );
}
