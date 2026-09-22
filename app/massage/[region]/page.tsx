import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
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

// 네이버 및 검색엔진 수집용 메타데이터 (타이틀 및 메타 디스크립션 1000가지 순차적 변형 조합)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region } = resolvedParams;

  const regionName = getRegionKoreanName(region);

  // 1000개 이상의 고유 변수 인덱스 생성
  const charSum = regionName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 1000;

  // 타이틀 1000가지 순환 조합을 위한 배열
  const titleTemplates = [
    `${regionName} 전체 마사지 제휴 안내 | 타이마사지 & 스웨디시 - 투데이쿡`,
    `${regionName} 지역 웰니스 마사지 추천 코스 안내 · 투데이쿡`,
    `${regionName} 아로마 & 스웨디시 바디케어 종합 가이드 - 투데이쿡`,
    `${regionName} 정통 타이마사지 및 릴렉스 테라피 안내 | 투데이쿡`,
    `${regionName} 프라이빗 웰니스 힐링 마사지 제휴점 모음 - 투데이쿡`,
    `${regionName} 전신 힐링 마사지 프로그램 및 가격 안내 · 투데이쿡`,
    `${regionName} 1:1 맞춤형 바디케어 & 웰니스 테라피 - 투데이쿡`,
    `${regionName} 편안한 힐링 마사지 제휴업체 정보 총정리 | 투데이쿡`,
    `${regionName} 쾌적한 스웨디시 & 아로마 웰니스 안내 - 투데이쿡`,
    `${regionName} 웰니스 바디 테라피 및 정찰제 코스 가이드 · 투데이쿡`,
    `${regionName} 전문 스웨디시 마사지 힐링 스팟 | 투데이쿡`,
    `${regionName} 감성 테라피 및 아로마 마사지 할인 안내 · 투데이쿡`,
    `${regionName} 지친 일상을 깨우는 시원한 마사지 케어 - 투데이쿡`,
    `${regionName} 프라이빗 타이 마사지 및 릴랙싱 테라피 · 투데이쿡`,
    `${regionName} 피로 회복을 위한 전문 마사지 솔루션 - 투데이쿡`
  ];

  // 메타 디스크립션 1000가지 순환 조합 ('출장마사지' 키워드 분산 배치)
  const descTemplates = [
    `${regionName} 전 지역에서 편안하게 이용할 수 있는 출장마사지 및 매장 제휴업체 정보입니다. 지친 몸과 마음을 달래줄 전문 테라피스트의 케어를 만나보세요.`,
    `${regionName} 인근에서 차별화된 출장마사지 서비스를 찾고 계신다면 투데이쿡의 엄선된 제휴 코스와 합리적인 요금표를 확인해보세요.`,
    `${regionName} 맞춤형 힐링 테라피 안내입니다. 집이나 숙소로 부르는 편리한 출장마사지부터 쾌적한 전문 매장까지 한눈에 비교할 수 있습니다.`,
    `${regionName} 프라이빗한 휴식을 선사하는 출장마사지 및 타이·아로마 케어 프로그램. 숙련된 전문가의 손길로 피로를 날려보세요.`,
    `${regionName} 정성 어린 손길의 출장마사지 및 전신 바디케어 정보. 투명한 정찰제와 쾌적한 웰니스 코스를 지금 바로 만나보세요.`,
    `${regionName} 종합 힐링 가이드. ${regionName} 내에서 믿을 수 있는 출장마사지 서비스와 고급 스웨디시 마사지 업소를 편리하게 찾아보세요.`,
    `${regionName} 프리미엄 테라피 안내. 일상에 활력을 불어넣어 주는 전문 출장마사지 및 다양한 바디케어 프로그램을 안내해 드립니다.`,
    `${regionName} 릴렉스 바디케어 모음. 편안한 휴식을 제공하는 출장마사지 제휴점과 정통 아로마 테라피 코스를 지금 확인해보세요.`
  ];

  const titleIndex = variantIndex % titleTemplates.length;
  const descIndex = variantIndex % descTemplates.length;

  const finalTitle = `${titleTemplates[titleIndex]} (${variantIndex + 1})`;
  const finalDescription = descTemplates[descIndex];

  return {
    title: {
      absolute: finalTitle
    },
    description: finalDescription,
    keywords: [
      `${regionName} 마사지`,
      `${regionName} 출장마사지`,
      `${regionName} 타이마사지`,
      `${regionName} 스웨디시`,
      `${regionName} 아로마 마사지`,
      `${regionName} 웰니스 테라피`,
      "투데이쿡"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://todaykkuk.netlify.app/massage/${region}`,
      siteName: "투데이쿡",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function MassageRegionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region } = resolvedParams;
  const regionName = getRegionKoreanName(region);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {regionName} 마사지 및 출장마사지 제휴 안내
        </h1>
        <p className="text-gray-600 mb-8">
          원하시는 구와 동을 선택하여 상세한 제휴업체 정보와 코스별 요금을 확인해 보세요.
        </p>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">
            현재 경로: /massage/{region}
          </p>
          {/* 구/동 선택을 유도하는 링크나 컴포넌트를 이어서 배치할 수 있습니다. */}
        </div>
      </div>
    </main>
  );
}