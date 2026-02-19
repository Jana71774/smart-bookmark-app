"use client";
import { supabase } from "@/lib/supabaseClient";

export default function LoginCard() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center w-[350px]">
        <h1 className="text-2xl font-bold text-white mb-6">
          Smart Bookmark App
        </h1>
        <button
          onClick={login}
          className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
