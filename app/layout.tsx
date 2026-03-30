import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import { QueryProvider } from "@/lib/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Dream OS V14.0 - Global Pro AI Agent",
  description: "Sovereign Neural Architecture - Production Ready",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dream OS",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
        <link rel="icon" href="/assets/img/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
        <script src="/wasm_exec.js" async></script>
      </head>
      <body className={`${inter.className} ${amiri.className}`}>
        <ErrorBoundary>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
