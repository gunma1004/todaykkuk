import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
}

function getRegionKoreanName(region: string): string {
  switch (region.toLowerCase()) {
    case "seoul": return "서울";
    case "incheon": return "인천";
    case "gyeonggi": return "경기";
    default: return "수도권";
  }
}

function safeDecode(str: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

// 구/시 단위 메타데이터 생성 (1000가지 순차 조합)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const locationTitle = `${regionName} ${districtName}`.trim();

  const charSum = (locationTitle + districtName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 1000;

  const titleTemplates = [
    `${locationTitle} 마사지 제휴 안내 | 타이마사지 & 스웨디시 - 투데이쿡`,
    `${locationTitle} 웰니스 마사지 추천 코스 안내 · 투데이쿡`,
    `${locationTitle} 아로마 & 스웨디시 바디케어 가이드 - 투데이쿡`,
    `${locationTitle} 정통 타이마사지 및 릴렉스 테라피 안내 | 투데이쿡`,
    `${locationTitle} 프라이빗 웰니스 힐링 마사지 제휴점 - 투데이쿡`
  ];

  const descTemplates = [
    `${locationTitle} 지역에서 편리하게 부를 수 있는 출장 서비스부터 쾌적한 전문 매장의 마사지 제휴업체 정보까지 한눈에 비교해보세요.`,
    `${locationTitle} 인근에서 차별화된 출장 서비스와 힐링 마사지 프로그램을 찾고 계신다면 투데이쿡의 엄선된 요금표를 확인해보세요.`,
    `${locationTitle} 맞춤형 홈케어 출장 안내입니다. 집에서 편안하게 받는 서비스부터 전문 매장의 릴렉스 마사지까지 만나보세요.`
  ];

  const titleIndex = variantIndex % titleTemplates.length;
  const descIndex = variantIndex % descTemplates.length;

  const finalTitle = `${titleTemplates[titleIndex]} (${variantIndex + 1})`;
  const finalDescription = descTemplates[descIndex];

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    keywords: [
      `${locationTitle} 마사지`,
      `${locationTitle} 출장마사지`,
      `${locationTitle} 타이마사지`,
      `${locationTitle} 스웨디시`,
      "투데이쿡"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://todaykkuk.netlify.app/massage/${region}/${district}`,
      siteName: "투데이쿡",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const locationTitle = `${regionName} ${districtName}`;

  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 pb-20">
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
      </div>
    </main>
  );
}