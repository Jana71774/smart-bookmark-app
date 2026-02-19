"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoginCard from "@/components/LoginCard";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import Toast from "@/components/Toast";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } =
        await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!user) return <LoginCard />;

  return (
    <div className="flex justify-center items-start min-h-screen pt-12">
      <div className="bg-white/90 w-full max-w-3xl p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">📚 My Bookmarks</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <BookmarkForm user={user} setToast={setToast} />
        <BookmarkList user={user} setToast={setToast} />
      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}
