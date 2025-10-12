import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllPosts } from "../../services/posts";

export function ViewPost() {
  //id, title, content
  const [postData, setPostData] = useState(null);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  async function fetchData() {
    const result = await getAllPosts({ id: id });
    setPostData(result.data[0]);
  }

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4">{postData.title}</div>{" "}
      <div
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </div>
  );
}
