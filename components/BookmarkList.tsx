"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center text-white mt-6">
        No bookmarks yet 🚀
      </div>
    );
  }

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white rounded-xl p-4 shadow-md flex justify-between items-center mb-4 hover:shadow-lg transition"
        >
          <div>
            <h3 className="font-semibold text-gray-800">
              {bookmark.title}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-indigo-600 text-sm hover:underline"
            >
              {bookmark.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
