"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Navbar({ email }: { email: string }) {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-white text-2xl font-bold">
        📚 Smart Bookmark Manager
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-white text-sm">{email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
