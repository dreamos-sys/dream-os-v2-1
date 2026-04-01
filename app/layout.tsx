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
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
