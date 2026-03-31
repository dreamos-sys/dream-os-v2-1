// app/layout.tsx
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"  // ← TAMBAHKAN INI

export const metadata: Metadata = {
  title: "Dream OS v2.1 Sovereign",
  description: "Out of The Box Inside - Dream Team System",
  // ... existing metadata
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
        
        {/* ← TAMBAHKAN INI sebelum closing body */}
        <Analytics />
        
      </body>
    </html>
  )
}import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: 'Dream OS v2.1 Sovereign',
  description: 'Out of The Box Inside - Dream Team System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
