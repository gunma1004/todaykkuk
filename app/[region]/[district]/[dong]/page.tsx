import { Metadata } from "next";
import DongClientUI from "../../../massage/[region]/[district]/DongClientUI";

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

// 네이버 로봇 및 검색엔진이 수집하는 고유 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const dongName = dong && dong !== "all" ? safeDecode(dong) : "";

  const locationTitle = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (locationTitle + districtName + dongName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 10;

  const titleVariants = [
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

  const descriptionVariants = [
    `${locationTitle} 엄선된 웰니스 마사지 제휴업체 정보! 타이마사지, 아로마, 스웨디시 코스 요금표와 상세 안내를 확인하세요.`,
    `${simpleLocation} 인근 편안한 힐링 테라피 가이드. 베테랑 테라피스트의 체계적인 마사지 프로그램을 투데이쿡에서 만나보세요.`,
    `${locationTitle} 쾌적한 웰니스 마사지 제휴점 모음. 투명한 정찰제 요금과 정성스러운 바디케어 서비스를 제공합니다.`,
    `${simpleLocation} 맞춤형 힐링 마사지 코스 안내. 일상의 피로를 부드럽게 풀어주는 정통 스웨디시 및 아로마 테라피.`,
    `${locationTitle} 프라이빗 웰니스 가이드. 뭉친 근육과 스트레스를 편안하게 해소하는 최상의 휴식 코스 안내.`,
    `${simpleLocation} 제휴 마사지 업체 정보. 100% 현장 정찰제와 쾌적한 케어 프로그램을 지금 확인하세요.`,
    `${locationTitle} 1:1 웰니스 바디케어 추천. 숙련된 테라피스트의 디테일한 손길로 전신 피로를 회복하세요.`,
    `${simpleLocation} 안심 힐링 마사지 프로그램 가이드. 타이마사지와 천연 아로마 케어 정보를 한눈에 비교할 수 있습니다.`,
    `${locationTitle} 전문 웰니스 제휴 안내. 포근한 감성 스웨디시와 릴렉스 마사지로 활력을 충전하세요.`,
    `${simpleLocation} 웰니스 테라피 종합 안내. 고객 만족도 높은 추천 마사지 코스와 이용 요금 안내.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: {
      absolute: finalTitle
    },
    description: finalDescription,
    keywords: [
      `${locationTitle} 마사지`,
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
      url: `https://todaykkuk.netlify.app/${region}/${district}/${dong}`,
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
    <DongClientUI 
      region={region} 
      district={district} 
      dong={dong} 
      locationTitle={locationTitle} 
    />
  );
}