'use client';

type BismillahBannerProps = {
  className?: string;
};

export function BismillahBanner({ className = '' }: BismillahBannerProps) {
  return (
    <div className={`bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-b border-amber-200 py-2 px-4 text-center ${className}`}>
      <p className="text-amber-800 text-sm font-arabic font-semibold tracking-wide">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <p className="text-amber-700 text-[10px] mt-0.5 font-medium">
        Bismillahirrahmanirrahim · Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
      </p>
    </div>
  );
}
