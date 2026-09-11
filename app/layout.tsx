import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseFlow | Student Assignment Organizer",
  description: "See coursework from every class in one focused, prioritized weekly view.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#f6f7fb]">
      <body className="antialiased">{children}</body>
    </html>
  );
}
