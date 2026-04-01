import Head from 'next/head';

export default function DreamPage() {
  return (
    <>
      <Head>
        <title>Dream OS V21</title>
      </Head>
      <main style={{ 
        padding: '20px', 
        color: 'white', 
        minHeight: '100vh', 
        backgroundColor: '#022c22',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#34d399', marginBottom: '10px', fontSize: '24px' }}>
          🏠 Dream OS V21
        </h1>
        <p style={{ marginBottom: '20px', color: '#cbd5e1' }}>
          ✅ Pages Router /dream is WORKING!
        </p>
        <a href="/" style={{ color: '#34d399', textDecoration: 'underline' }}>
          ← Back to Home
        </a>
      </main>
    </>
  );
}
