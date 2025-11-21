// -------------------- GET SINGLE POST --------------------
export async function getPost({ title }) {
  if (!title) {
    throw new Error("Title can't be null or undefined!");
  }

  const res = await fetch(`/api/posts?title=${encodeURIComponent(title)}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const result_json = await res.json();
  return result_json.data.length > 0 ? result_json.data[0] : null;
}

// -------------------- GET ALL POSTS --------------------
export async function getAllPosts({
  id = "",
  title = "",
  content = "",
  pageIndex = "",
  pageSize = "",
}) {
  const params = new URLSearchParams({
    id: id || "",
    title: title || "",
    content: content || "",
    pageIndex: pageIndex || "",
    pageSize: pageSize || "",
  });

  const res = await fetch(`/api/posts?${params.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}

// -------------------- GET POSTS BY CONTENT --------------------
export async function getPostsByContent({
  content,
  pageIndex = "",
  pageSize = "",
}) {
  if (!content) {
    throw new Error("Content is required!");
  }

  const params = new URLSearchParams({
    content: content || "",
    pageIndex: pageIndex || "",
    pageSize: pageSize || "",
  });

  const res = await fetch(`/api/posts?${params.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}

// -------------------- ADD POST --------------------
export async function addPost({ row }) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });

  return res.json();
}

// -------------------- UPDATE POST --------------------
export async function updatePost({ row }) {
  const res = await fetch(`/api/posts/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });

  return res.json();
}

// -------------------- DELETE POST --------------------
export async function deletePost({ row }) {
  const res = await fetch(`/api/posts/${row.id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}
