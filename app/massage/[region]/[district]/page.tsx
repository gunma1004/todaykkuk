import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
}

const shops = [
  { id: "shop1", name: "🔥 한국미인테라피", desc: "선입금 없는 100% 후불제 맞춤 방문 힐링 케어", price: "100,000원부터~", phone: "0507-1280-3303" },
  { id: "shop2", name: "✨ 오늘밤테라피", desc: "품격 있는 힐링을 선사하는 최고급 오일 프라이빗 방문 테라피", price: "60,000원부터~", phone: "0507-1280-3223" },
  { id: "shop3", name: "💎 주주테라피", desc: "재방문율 1위! 칼도착 25분 보장, 철저한 위생 관리", price: "60,000원부터~", phone: "0507-1280-3193" },
  { id: "shop4", name: "🌟 퀸즈홈테라피", desc: "전문 힐러들의 맞춤형 VIP 피로회복 특화 프로그램 운영 중", price: "60,000원부터~", phone: "0507-1280-3334" },
  { id: "shop5", name: "👑 한국골든테라피", desc: "수도권 전지역 평균 25분 내 실시간 도착 보장 서비스", price: "110,000원부터~", phone: "0507-1280-3360" },
];

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

// 100가지 이상의 타이틀 조합을 만들어내는 함수
function generate100Titles(locationTitle: string, index: number): string {
  const prefixes = [
    `${locationTitle} 마사지 제휴 안내`,
    `${locationTitle} 웰니스 마사지 추천 코스`,
    `${locationTitle} 아로마 & 스웨디시 바디케어`,
    `${locationTitle} 정통 타이마사지 및 릴렉스 테라피`,
    `${locationTitle} 프라이빗 웰니스 힐링 마사지`,
    `${locationTitle} 출장마사지 & 홈케어 가이드`,
    `${locationTitle} 맞춤형 방문 테라피 정보`,
    `${locationTitle} 전문 바디케어 서비스 안내`,
    `${locationTitle} 힐링 스웨디시 & 타이 마사지샵`,
    `${locationTitle} 프리미엄 방문 홈케어 총정리`
  ];

  const middles = [
    "타이마사지 & 스웨디시",
    "맞춤형 피로회복 코스",
    "후불제 전문 힐링 케어",
    "내 주변 방문 케어 안내",
    "감성 충전 테라피 총정리",
    "프리미엄 릴렉스 프로그램",
    "전문 관리사 방문 서비스",
    "시원한 정통 바디케어",
    "프라이빗 힐링 솔루션",
    "만족도 높은 제휴업체 정보"
  ];

  const suffixes = [
    "투데이쿡",
    "안심 케어 플랫폼",
    "힐링 가이드",
    "전문 제휴센터",
    "맞춤 정보 포털"
  ];

  const p = prefixes[index % prefixes.length];
  const m = middles[Math.floor(index / prefixes.length) % middles.length];
  const s = suffixes[index % suffixes.length];

  return `${p} | ${m} - ${s}`;
}

// 100가지 이상의 설명(Description) 조합을 만들어내는 함수
function generate100Descriptions(locationTitle: string, index: number): string {
  const hooks = [
    `${locationTitle} 지역에서 편리하게 부를 수 있는 출장 서비스부터 쾌적한 전문 매장의 마사지 제휴업체 정보까지 한눈에 비교해보세요.`,
    `${locationTitle} 인근에서 차별화된 출장 서비스와 힐링 마사지 프로그램을 찾고 계신다면 투데이쿡의 엄선된 요금표를 확인해보세요.`,
    `${locationTitle} 맞춤형 홈케어 출장 안내입니다. 집에서 편안하게 받는 서비스부터 전문 매장의 릴렉스 마사지까지 만나보세요.`,
    `${locationTitle} 전 지역에서 신속하게 이용 가능한 후불제 홈케어 및 제휴 마사지샵 정보를 빠르고 정확하게 안내해 드립니다.`,
    `${locationTitle} 최고의 힐링을 선사하는 전문 테라피스트들의 맞춤형 코스 안내. 지금 바로 투데이쿡에서 제휴 혜택을 확인하세요.`
  ];

  const details = [
    " 선입금 없는 안전한 후불제 시스템과 투명한 가격표로 안심하고 이용하실 수 있습니다.",
    " 매일 지친 일상 속 피로를 말끔히 해소해 줄 프라이빗 케어 프로그램을 지금 경험해 보세요.",
    " 철저한 위생 관리와 검증된 제휴점으로 언제 어디서나 편안한 힐링을 보장합니다.",
    " 평균 도착 시간 보장 및 고객 만족도가 검증된 실시간 인기 업소들을 모아두었습니다."
  ];

  const h = hooks[index % hooks.length];
  const d = details[Math.floor(index / hooks.length) % details.length];

  return h + d;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const locationTitle = `${regionName} ${districtName}`.trim();

  // 지역 문자열의 문자 코드 합산을 활용하여 0 ~ 99 범위의 고유하고 무작위적인 인덱스(100가지 조합) 추출
  const charSum = (locationTitle + districtName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 100;

  const finalTitle = generate100Titles(locationTitle, variantIndex);
  const finalDescription = generate100Descriptions(locationTitle, variantIndex);

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

        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            ✨ 실시간 추천 제휴 업체
          </h2>
          
          <div className="grid gap-4">
            {shops.map((shop) => (
              <div key={shop.id} className="bg-[#121214] border border-amber-500/20 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-500/60 transition-all">
                <div className="space-y-1">
                  <span className="text-lg font-extrabold text-white">{shop.name}</span>
                  <p className="text-xs text-gray-400">{shop.desc}</p>
                  <div className="text-sm font-bold text-amber-400 pt-1">
                    이용 요금: <span className="text-white">{shop.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <a 
                    href={`tel:${shop.phone}`} 
                    className="flex-1 md:flex-none text-center bg-amber-500 text-black px-5 py-2.5 rounded-xl font-extrabold text-xs hover:bg-amber-400 transition-all shadow-md"
                  >
                    📞 예약 전화 ({shop.phone})
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}