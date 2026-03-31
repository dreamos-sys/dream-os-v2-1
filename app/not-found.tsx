"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-emerald-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Halaman tidak ditemukan</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  )
}
