import { Metadata } from "next";
import DistrictClientUI from "./DistrictClientUI";

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

// 스팸 키워드를 완전히 배제하고 1000가지 순차 조합을 만들어내는 메타데이터 생성 함수
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const locationTitle = `${regionName} ${districtName}`.trim();

  // 고유한 문자 코드 합산을 활용하여 0 ~ 999 범위의 1000가지 순차 인덱스 추출
  const charSum = (locationTitle + districtName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 1000;

  const titleTemplates = [
    `${locationTitle} 웰니스 케어 안내 | 바디케어 & 릴렉스 - 투데이쿡`,
    `${locationTitle} 프리미엄 힐링 테라피 추천 코스 · 투데이쿡`,
    `${locationTitle} 아로마 & 스웨디시 케어 가이드 - 투데이쿡`,
    `${locationTitle} 정통 바디 테라피 및 릴렉스 프로그램 안내 | 투데이쿡`,
    `${locationTitle} 프라이빗 웰니스 힐링 제휴점 - 투데이쿡`,
    `${locationTitle} 전신 피로회복 케어 프로그램 및 가격 안내 · 투데이쿡`,
    `${locationTitle} 1:1 맞춤형 컨디셔닝 & 웰니스 테라피 - 투데이쿡`,
    `${locationTitle} 편안한 휴식 바디케어 제휴업체 정보 | 투데이쿡`,
    `${locationTitle} 쾌적한 릴렉스 & 웰니스 안내 - 투데이쿡`,
    `${locationTitle} 전문 바디 케어 및 정찰제 코스 가이드 · 투데이쿡`
  ];

  const descTemplates = [
    `${locationTitle} 지역에서 편리하게 이용할 수 있는 방문 홈케어 서비스부터 쾌적한 전문 매장의 제휴업체 정보까지 한눈에 비교해보세요.`,
    `${locationTitle} 인근에서 차별화된 방문 서비스와 힐링 프로그램을 찾고 계신다면 투데이쿡의 엄선된 요금표를 확인해보세요.`,
    `${locationTitle} 맞춤형 홈케어 안내입니다. 집에서 편안하게 받는 서비스부터 전문 매장의 릴렉스 케어까지 만나보세요.`,
    `${locationTitle} 프라이빗한 휴식을 선사하는 전문 방문 서비스 및 아로마 프로그램으로 일상의 피로를 날려보세요.`,
    `${locationTitle} 정성 어린 손길의 바디케어 정보. 투명한 정찰제와 쾌적한 웰니스 코스를 지금 바로 확인해보세요.`
  ];

  const titleIndex = variantIndex % titleTemplates.length;
  const descIndex = variantIndex % descTemplates.length;

  const finalTitle = `${titleTemplates[titleIndex]} (${variantIndex + 1})`;
  const finalDescription = descTemplates[descIndex];

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    keywords: [
      `${locationTitle} 바디케어`,
      `${locationTitle} 홈케어`,
      `${locationTitle} 웰니스 테라피`,
      `${locationTitle} 릴렉스 마사지`,
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
      <DistrictClientUI 
        region={region} 
        district={district} 
        locationTitle={locationTitle} 
      />
    </main>
  );
}