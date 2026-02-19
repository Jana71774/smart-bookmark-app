"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoginCard from "@/components/LoginCard";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import Navbar from "@/components/Navbar";

export default function Page() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
        <LoginCard />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
        <Navbar email={session.user.email} />
        <BookmarkForm user={session.user} />
        <BookmarkList user={session.user} />
      </div>
    </main>
  );
}
