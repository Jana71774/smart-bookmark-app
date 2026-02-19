"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ user }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mb-6">
      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={addBookmark}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Add Bookmark
      </button>
    </div>
  );
}
