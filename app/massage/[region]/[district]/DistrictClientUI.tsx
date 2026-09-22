"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Shop {
  id: number;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

interface DistrictClientUIProps {
  region: string;
  district: string;
  locationTitle: string;
}

const initialShopList: Shop[] = [
  { id: 1, name: "한국미녀홈타이", desc: "수도권 주요 지역 감성 스웨디시 & 아로마 웰니스 테라피", phone: "0507-1280-3303", price: "100,000원부터~", image: "/shop1.jpg" },
  { id: 2, name: "너무이쁜홈타이", desc: "품격 있는 힐링을 선사하는 정통 타이마사지 및 프라이빗 바디케어", phone: "0507-1280-3190", price: "60,000원부터~", image: "/shop2.jpg" },
  { id: 3, name: "예쁜걸홈타이", desc: "철저한 위생 관리와 쾌적한 릴렉스 아로마 마사지 프로그램", phone: "0507-1280-3185", price: "60,000원부터~", image: "/shop3.jpg" },
  { id: 4, name: "퀸즈홈테라피", desc: "전문 테라피스트들의 1:1 맞춤형 VIP 피로회복 웰니스 케어", phone: "0507-1280-3222", price: "60,000원부터~", image: "/shop4.jpg" },
  { id: 5, name: "한국골든테라피", desc: "선입금 없는 100% 현장 후불제 안심 감성 스웨디시 마사지", phone: "0507-1280-3360", price: "110,000원부터~", image: "/shop5.jpg" }
];

export default function DistrictClientUI({ region, district, locationTitle }: DistrictClientUIProps) {
  const [shuffledShops, setShuffledShops] = useState<Shop[]>(initialShopList);

  useEffect(() => {
    // 새로고침할 때마다 랜덤으로 섞음
    setShuffledShops([...initialShopList].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans pb-24">
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
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

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        <div className="text-center space-y-2 py-6 bg-[#121214] border border-amber-500/30 rounded-3xl p-6 shadow-lg">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">WELLNESS & MASSAGE PARTNERS</span>
          <h1 className="text-2xl md:text-3xl font-black text-white">📍 {locationTitle} 웰니스 마사지 제휴업체</h1>
          <p className="text-xs text-gray-300">선입금 없는 100% 현장 후불제 안심 스웨디시 · 타이마사지 안내</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledShops.map((shop) => (
            <div key={shop.id} className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 hover:border-amber-400 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative">
              {/* 🌟 구 단위 샵 상세 페이지 경로로 매칭 (/massage/[region]/[district]/shop/[id]) */}
              <Link href={`/massage/${region}/${district}/shop/${shop.id}`} className="absolute inset-0 z-10" aria-label={`${shop.name} 상세보기`} />
              <img src={shop.image} alt={shop.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-amber-500/30" />
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                  {shop.name}
                </h3>
                <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{shop.desc}</p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300">{shop.price}</span>
                  <a href={`tel:${shop.phone}`} className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all relative z-20">
                    전화연결
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}