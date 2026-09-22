// app/massage/[region]/[district]/DistrictClientUI.tsx (경로는 프로젝트 구조에 맞게 조절)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DistrictClientUIProps {
  region: string;
  district: string;
  locationTitle: string;
}

const originalShops = [
  { id: "shop1", name: "🔥 한국미인테라피", desc: "선입금 없는 100% 후불제 맞춤 방문 힐링 케어", price: "100,000원부터~", phone: "0507-1280-3303" },
  { id: "shop2", name: "✨ 오늘밤테라피", desc: "품격 있는 힐링을 선사하는 최고급 오일 프라이빗 방문 테라피", price: "60,000원부터~", phone: "0507-1280-3223" },
  { id: "shop3", name: "💎 주주테라피", desc: "재방문율 1위! 칼도착 25분 보장, 철저한 위생 관리", price: "60,000원부터~", phone: "0507-1280-3193" },
  { id: "shop4", name: "🌟 퀸즈홈테라피", desc: "전문 힐러들의 맞춤형 VIP 피로회복 특화 프로그램 운영 중", price: "60,000원부터~", phone: "0507-1280-3334" },
  { id: "shop5", name: "👑 한국골든테라피", desc: "수도권 전지역 평균 25분 내 실시간 도착 보장 서비스", price: "110,000원부터~", phone: "0507-1280-3360" },
];

export default function DistrictClientUI({ region, district, locationTitle }: DistrictClientUIProps) {
  const [shops, setShops] = useState(originalShops);

  useEffect(() => {
    // 새로고침할 때마다 랜덤으로 섞음
    const shuffled = [...originalShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-black text-base shadow border border-amber-400">
              뚝
            </div>
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              투데이쿡
            </span>
          </Link>
          <Link href="/" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
            🏠 메인으로
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-[#121214] border border-amber-500/30 p-6 rounded-3xl text-center space-y-3 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-xl border border-amber-500/30">
            📍 선택하신 지역
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">{locationTitle} 마사지 및 출장마사지 제휴 안내</h1>
          <p className="text-xs md:text-sm text-gray-300">
            원하시는 하위 동을 선택하시거나 아래 제휴업체 정보를 확인해 보세요.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            ✨ 실시간 추천 제휴 업체
          </h2>
          
          <div className="grid gap-4">
            {shops.map((shop) => (
              <div key={shop.id} className="bg-[#121214] border border-amber-500/20 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-500/60 transition-all">
                <div className="space-y-1">
                  {/* 구 하위 샵 상세 페이지로 연결되는 링크 */}
                  <Link href={`/massage/${region}/${district}/${shop.id}`} className="text-lg font-extrabold text-white hover:text-amber-400 transition-colors">
                    {shop.name}
                  </Link>
                  <p className="text-xs text-gray-400">{shop.desc}</p>
                  <div className="text-sm font-bold text-amber-400 pt-1">
                    이용 요금: <span className="text-white">{shop.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Link 
                    href={`/massage/${region}/${district}/${shop.id}`}
                    className="flex-1 md:flex-none text-center bg-zinc-800 text-amber-400 border border-amber-500/30 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-500 hover:text-black transition-all"
                  >
                    상세보기
                  </Link>
                  <a 
                    href={`tel:${shop.phone}`} 
                    className="flex-1 md:flex-none text-center bg-amber-500 text-black px-5 py-2.5 rounded-xl font-extrabold text-xs hover:bg-amber-400 transition-all shadow-md"
                  >
                    📞 예약 전화
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}