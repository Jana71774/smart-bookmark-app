🔖 Smart Bookmark App

A modern full-stack bookmark management application built with Next.js, Supabase, and deployed on Vercel.

🚀 Live Demo

🌍 https://smart-bookmark-app-wine-six.vercel.app/

✨ Features

🔐 Google Authentication (OAuth 2.0)

➕ Add personal bookmarks

📋 View saved bookmarks

❌ Delete bookmarks

🔒 User-specific data using Row-Level Security

⚡ Real-time updates (Supabase Realtime)

📱 Fully responsive UI

🛠 Tech Stack
Layer	Technology
Frontend	Next.js (App Router)
Backend	Supabase
Database	PostgreSQL
Authentication	Supabase Auth (Google OAuth)
Deployment	Vercel
Language	TypeScript
📂 Project Structure
smart-bookmark-app/
│
├── app/                # App Router pages
├── components/         # Reusable UI components
├── lib/                # Supabase client
├── public/             # Static assets
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Jana71774/smart-bookmark-app.git
cd smart-bookmark-app

2️⃣ Install dependencies
npm install

3️⃣ Add Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4️⃣ Run Development Server
npm run dev


Open:

http://localhost:3000

🗄 Database Schema (Supabase)
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp default now()
);

alter table bookmarks enable row level security;

create policy "Users manage own bookmarks"
on bookmarks for all
using (auth.uid() = user_id);

🔐 OAuth Configuration

Google OAuth requires:

Authorized JavaScript Origin:
https://smart-bookmark-app-wine-six.vercel.app

Redirect URI:
https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback

🎯 Key Learning Outcomes

Implemented OAuth authentication

Configured Row-Level Security (RLS)

Integrated real-time database updates

Managed environment variables securely

Deployed full-stack application to production

Used Git & GitHub workflow professionally

👨‍💻 Author

Janarthanan M
B.E Computer Science and Engineering
Aspiring Full Stack Developer

⭐ If you like this project

Give it a ⭐ on GitHub!

If you want, I can also:

🔥 Make it more ATS-friendly for recruiters

🧠 Create interview explanation script

📢 Write LinkedIn launch post

💼 Convert this into a portfolio project description

Just tell me what you need next 👌
