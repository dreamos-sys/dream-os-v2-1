import './globals.css';

export const metadata = {
  title: 'Dream OS V21',
  description: 'AI-Powered Operational System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-dream-900 text-neutral-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
