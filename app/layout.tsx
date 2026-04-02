import './globals.css';

export const metadata = {
  title: 'Dream OS V2.1 - AI-Powered Operational System',
  description: 'Sistem Operasi Terintegrasi dengan AI untuk Manajemen Operasional',
  keywords: 'Dream OS, AI, Management, Operational System',
  authors: [{ name: 'Dream Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#f9fafb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/assets/img/dream-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/img/dream-logo.svg" />
      </head>
      <body style={{margin:0,padding:0,fontFamily:'system-ui,-apple-system,sans-serif',background:'#f9fafb',color:'#111827'}}>
        {children}
      </body>
    </html>
  );
}
