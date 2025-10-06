// Auto-generated service for posts

export async function getPost({ title }) {
  if (!title) {
    throw new Error("title can't be null or undefined.");
  }

  const result = await fetch(`/api/posts?title=${title}`);
  const result_json = await result.json();

  if (result_json.data.length > 0) {
    return result_json.data[0];
  }

  return null;
}

export async function getAllPosts({ id, title, content , pageIndex, pageSize }) {
  const params = new URLSearchParams();

  params.append("pageIndex", pageIndex || "");
  params.append("pageSize", pageSize || "");
  params.append("id", id || "");
  params.append("title", title || "");
  params.append("content", content || "");

  const result = await fetch(`/api/posts?${params.toString()}`);
  return await result.json();
}

export async function getPostsByContent({ content, pageIndex, pageSize }) {
  if ([null, undefined, ""].includes(content)) {
    throw new Error("content is required.");
  }

  const params = new URLSearchParams({
    content: content,
    pageIndex: pageIndex ?? "",
    pageSize: pageSize ?? "",
  });

  const result = await fetch(`/api/posts?${params.toString()}`);
  return await result.json();
}

export async function addPost({ row }) {
  const result = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  return await result.json();
}

export async function updatePost({ row }) {
  const result = await fetch(`/api/posts/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  return await result.json();
}

export async function deletePost({ row }) {
  const result = await fetch(`/api/posts/${row.id}`, {
    method: "DELETE",
  });

  return await result.json();
}
