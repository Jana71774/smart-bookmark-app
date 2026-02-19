"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Loader from "./Loader";

export default function BookmarkList({ user, setToast }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
    setLoading(false);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    setToast("Bookmark deleted!");
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {bookmarks.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No bookmarks yet 🚀
        </div>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-lg font-semibold text-purple-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <p className="text-sm text-gray-500">{bookmark.url}</p>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
