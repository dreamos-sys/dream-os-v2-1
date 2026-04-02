export default function DreamPage() {
  return (
    <main style={{minHeight:'100vh',background:'#f9fafb',color:'#111827',fontFamily:'system-ui'}}>
      {/* Header */}
      <header style={{background:'white',borderBottom:'1px solid #e5e7eb',padding:'1rem',position:'sticky',top:0,zIndex:50}}>
        <h1 style={{fontSize:'1.25rem',fontWeight:'700'}}>🏠 Dream OS</h1>
      </header>

      {/* Bismillah Banner */}
      <div style={{background:'#fef3c7',borderBottom:'1px solid #fcd34d',padding:'0.5rem 1rem',textAlign:'center'}}>
        <p style={{color:'#92400e',fontSize:'0.875rem'}}>بِسْمِ اللَّهِ</p>
        <p style={{color:'#b45309',fontSize:'0.75rem'}}>Dream OS v2.1</p>
      </div>

      {/* Content */}
      <div style={{padding:'1rem'}}>
        <div style={{background:'white',borderRadius:'1rem',padding:'1.5rem',border:'1px solid #e5e7eb',marginBottom:'1rem'}}>
          <p style={{color:'#374151',marginBottom:'0.5rem'}}>💬 Dream AI Assistant</p>
          <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'0.75rem',padding:'1rem'}}>
            <p style={{color:'#1e293b',fontSize:'0.875rem'}}>Halo! Ada yang bisa Dream OS bantu? 🤖✨</p>
          </div>
        </div>

        {/* Modules - Simple array, no destructuring */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.75rem'}}>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:'1.5rem'}}>🎯</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600'}}>Cmd</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:'1.5rem'}}>📅</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600'}}>Book</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:'1.5rem'}}>⚠️</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600'}}>K3</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:'1.5rem'}}>🛡️</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600'}}>Sec</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:'1.5rem'}}>🧹</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600'}}>Jan</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:'1.5rem'}}>📦</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600'}}>Stok</div>
          </button>
        </div>
      </div>

      {/* Tab Bar - Simple, no map destructuring */}
      <nav style={{background:'white',borderTop:'1px solid #e5e7eb',position:'fixed',bottom:0,left:0,right:0,padding:'0.5rem 1rem',zIndex:50}}>
        <div style={{display:'flex',justifyContent:'space-around'}}>
          <button style={{padding:'0.5rem',color:'#6b7280'}}><span style={{fontSize:'1.25rem'}}>💬</span></button>
          <button style={{padding:'0.5rem',color:'#6b7280'}}><span style={{fontSize:'1.25rem'}}>📄</span></button>
          <button style={{padding:'0.5rem',color:'#6b7280'}}><span style={{fontSize:'1.25rem'}}>⚙️</span></button>
        </div>
      </nav>
    </main>
  );
}
