import { Metadata } from "next";
import DongClientUI from "./DongClientUI";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
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

// 네이버 및 검색엔진 수집용 메타데이터 ('출장'과 '마사지'가 붙지 않고 분산된 디스크립션 1000가지 순차 조합)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const dongName = dong && dong !== "all" ? safeDecode(dong) : "";

  const locationTitle = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (locationTitle + districtName + dongName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 1000;

  const titleTemplates = [
    `${locationTitle} 마사지 제휴 안내 | 타이마사지 & 스웨디시 - 투데이쿡`,
    `${simpleLocation} 웰니스 마사지 추천 코스 안내 · 투데이쿡`,
    `${locationTitle} 아로마 & 스웨디시 바디케어 가이드 - 투데이쿡`,
    `${simpleLocation} 정통 타이마사지 및 릴렉스 테라피 안내 | 투데이쿡`,
    `${locationTitle} 프라이빗 웰니스 힐링 마사지 제휴점 - 투데이쿡`,
    `${simpleLocation} 전신 힐링 마사지 프로그램 및 가격 안내 · 투데이쿡`,
    `${locationTitle} 1:1 맞춤형 바디케어 & 웰니스 테라피 - 투데이쿡`,
    `${simpleLocation} 편안한 힐링 마사지 제휴업체 정보 | 투데이쿡`,
    `${locationTitle} 쾌적한 스웨디시 & 아로마 웰니스 안내 - 투데이쿡`,
    `${simpleLocation} 웰니스 바디 테라피 및 정찰제 코스 가이드 · 투데이쿡`
  ];

  // 메타 디스크립션: '출장'과 '마사지' 키워드가 들어가되 절대 붙어있지 않고 띄어져서 자연스럽게 분산 배치된 배열
  const descTemplates = [
    `${locationTitle} 지역에서 편리하게 부를 수 있는 출장 서비스부터 쾌적한 전문 매장의 마사지 제휴업체 정보까지 한눈에 비교해보세요.`,
    `${simpleLocation} 인근에서 차별화된 출장 서비스와 힐링 마사지 프로그램을 찾고 계신다면 투데이쿡의 엄선된 요금표를 확인해보세요.`,
    `${locationTitle} 맞춤형 홈케어 출장 안내입니다. 집에서 편안하게 받는 서비스부터 전문 매장의 릴렉스 마사지까지 만나보세요.`,
    `${simpleLocation} 프라이빗한 휴식을 선사하는 전문 출장 서비스 및 타이·아로마 마사지 프로그램으로 일상의 피로를 날려보세요.`,
    `${locationTitle} 정성 어린 손길의 출장 바디케어 정보. 투명한 정찰제와 쾌적한 웰니스 마사지 코스를 지금 바로 확인해보세요.`
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
      `${simpleLocation} 아로마 마사지`,
      `${simpleLocation} 웰니스 테라피`,
      `${simpleLocation} 바디케어`,
      "투데이쿡"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://todaykkuk.netlify.app/massage/${region}/${district}/${dong}`,
      siteName: "투데이쿡",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const dongName = dong && dong !== "all" ? safeDecode(dong) : "";
  const locationTitle = `${regionName} ${districtName} ${dongName}`.trim();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <DongClientUI 
        region={region} 
        district={districtName} 
        dong={dongName} 
        locationTitle={locationTitle}
      />
    </main>
  );
}