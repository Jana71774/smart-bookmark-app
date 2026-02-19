"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginCard() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome 👋</h2>
      <p className="text-gray-600 mb-6">
        Sign in to manage your bookmarks
      </p>
      <button
        onClick={login}
        className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
      >
        Continue with Google
      </button>
    </div>
  );
}
