"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header with Dream OS Icon */}
      <header className="bg-emerald-500 text-white p-6 text-center">
        <img src="/icons/dream-logo.png" alt="Dream OS" className="w-16 h-16 mx-auto mb-2" onError={(e) => {e.currentTarget.style.display='none'}} />
        <h1 className="text-3xl font-bold">DREAM OS</h1>
        <p className="text-sm opacity-80">v2.1 Sovereign</p>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {["📅 Form","⚠️ K3","🧹 Janitor","📦 Stock","🔧 Service","🏢 Asset"].map((m,i)=>(
            <button key={i} className="bg-gray-100 p-4 rounded-xl text-center shadow">{m}</button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation - 5 Buttons */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #ddd",padding:"10px",display:"flex",justifyContent:"space-around",zIndex:9999}}>
        <button onClick={()=>router.push("/")} style={{fontSize:"12px",background:"none",border:"none"}}>🏠 Home</button>
        <button onClick={()=>router.push("/profile")} style={{fontSize:"12px",background:"none",border:"none"}}>👤 Profile</button>
        <button onClick={()=>router.push("/qr")} style={{fontSize:"12px",background:"#10b981",color:"white",border:"none",padding:"8px 15px",borderRadius:"8px",fontWeight:"bold"}}>📷 QR</button>
        <button onClick={()=>router.push("/about")} style={{fontSize:"12px",background:"none",border:"none"}}>ℹ️ About</button>
        <button onClick={()=>router.push("/settings")} style={{fontSize:"12px",background:"none",border:"none"}}>⚙️ Setting</button>
      </div>
    </div>
  )
}
