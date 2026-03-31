import "./globals.css"

export const metadata = {
  title: "Dream OS v2.1",
  description: "Dream Team System",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  )
}
