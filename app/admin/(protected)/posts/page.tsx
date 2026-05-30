"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface FacebookPost {
  id: number;
  title: string | null;
  post_url: string;
  is_visible: boolean;
}

function extractFacebookUrl(input: string) {
  // If user pasted an iframe embed
  const hrefMatch = input.match(/href=([^&"]+)/);

  if (hrefMatch) {
    return decodeURIComponent(hrefMatch[1]);
  }

  // If user pasted a normal URL
  return input.trim();
}

export default function PostsPage() {
  const [title, setTitle] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadPosts() {
    const { data, error } = await supabase
      .from("facebook_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setPosts(data || []);
  }

  async function addPost(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

const cleanedUrl = extractFacebookUrl(postUrl);

const { error } = await supabase
  .from("facebook_posts")
  .insert([
    {
      title: title,
      post_url: cleanedUrl,
      is_visible: true,
    },
  ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setPostUrl("");
    setTitle("");
    loadPosts();
  }

  async function deletePost(id: number) {
    if (!confirm("Delete this post?")) return;

    const { error } = await supabase
      .from("facebook_posts")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadPosts();
  }

  async function toggleVisible(
    id: number,
    currentVisible: boolean
  ) {
    const { error } = await supabase
      .from("facebook_posts")
      .update({
        is_visible: !currentVisible,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Manage Facebook Posts</h1>

      <form onSubmit={addPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          style={{
            width: "500px",
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <input
          type="text"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
          placeholder="Paste Facebook URL or Facebook Embed Code"
          style={{
            width: "500px",
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button type="submit" disabled={loading}>
          Add Post
        </button>
      </form>

      <hr />

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>{post.title}</p>
          <p>{post.post_url}</p>

          <p>
            Visible:{" "}
            {post.is_visible ? "Yes" : "No"}
          </p>

          <button
            onClick={() =>
              toggleVisible(
                post.id,
                post.is_visible
              )
            }
          >
            {post.is_visible
              ? "Hide"
              : "Show"}
          </button>

          <button
            onClick={() =>
              deletePost(post.id)
            }
            style={{
              marginLeft: "10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}