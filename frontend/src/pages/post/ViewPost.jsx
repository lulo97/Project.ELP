import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addPost, getAllPosts, updatePost } from "../../services/posts";
import { RichTextEditorField } from "../../components/RichTextEditorField";
import { Button } from "../../components/Button";
import { message } from "../../providers/MessageProvider";

export function ViewPost() {
  //id, title, content
  const [postData, setPostData] = useState(null);
  const [editedContent, setEditedContent] = useState(null);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  async function fetchData() {
    const result = await getAllPosts({ id: id });
    setPostData(result.data[0]);
    setEditedContent(result.data[0].content);
  }

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="text-2xl font-bold">{postData.title}</div>
        {editedContent != postData.content && <div
          className="fixed top-[60px] right-0 p-4 z-10"
        >
          <Button
            className="opacity-75"
            text="Save"
            disabled={editedContent == postData.content}
            onClick={async () => {
              const body = { ...postData, content: editedContent };
              const result = await updatePost({ row: body });

              if (result.error) {
                message({ type: "error", text: result.error });
                return;
              }

              message({ text: "Success" });

              await fetchData();
            }}
          />
        </div>}
      </div>
      <RichTextEditorField
        value={editedContent}
        onChange={setEditedContent}
        disabled={false}
        className="h-full"
      />
    </div>
  );
}
