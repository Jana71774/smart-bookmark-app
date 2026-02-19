import "./app";
import "./globals.css"

export const metadata = {
  title: "Smart Bookmark Manager",
  description: "Save and manage your bookmarks securely",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
