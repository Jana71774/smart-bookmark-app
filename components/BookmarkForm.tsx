"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ user, setToast }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    const { error } = await supabase.from("bookmarks").insert([
      { title, url, user_id: user.id },
    ]);

    if (!error) {
      setToast("Bookmark added!");
      setTitle("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={addBookmark} className="flex gap-3 mb-6">
      <input
        className="flex-1 px-4 py-3 border rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="flex-1 px-4 py-3 border rounded-lg"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="bg-purple-600 text-white px-6 rounded-lg">
        Add
      </button>
    </form>
  );
}
