import { MetadataRoute } from 'next';
import { regionData } from '@/lib/regions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🌐 실제 서비스 도메인 주소로 통일
  const baseUrl = 'https://todaykkuk.netlify.app';

  // 1. 메인 홈 페이지
  const mainRoute: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 상단 카테고리 메인 페이지
  const categoryRoutes: MetadataRoute.Sitemap = [
    'services',
    'prices',
    'travel',
    'places',
    'reviews',
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. 메인 5개 제휴업체 상세 페이지 (/shop/1 ~ /shop/5)
  const shopRoutes: MetadataRoute.Sitemap = [1, 2, 3, 4, 5].map((id) => ({
    url: `${baseUrl}/shop/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. regionData를 활용하여 모든 지역(시·도, 구·군, 동·읍·면) 및 샵 상세 경로 동적 생성
  const dynamicRegionRoutes: MetadataRoute.Sitemap = [];
  const healingRegionRoutes: MetadataRoute.Sitemap = [];

  Object.entries(regionData).forEach(([regionKey, regionVal]) => {
    Object.entries(regionVal.districts).forEach(([districtKey, districtVal]) => {
      // 기본 지역별 구/시 권역 URL (예: /seoul/jongno 또는 수동 입력 방식과 호환되도록 구성)
      const districtPath = `${regionKey}/${districtKey}`;
      
      dynamicRegionRoutes.push({
        url: `${baseUrl}/${districtPath}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });

      healingRegionRoutes.push({
        url: `${baseUrl}/healing/${districtPath}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });

      // 5. 세부 동·읍·면 및 각 동별 샵 상세 페이지 경로 자동 순회 추가 (연천군 전곡읍 등 누락 방지)
      districtVal.dongs.forEach((dong) => {
        const encodedDong = encodeURIComponent(dong);
        const dongBasePath = `${districtPath}/${encodedDong}`;

        // 동·읍·면 페이지
        dynamicRegionRoutes.push({
          url: `${baseUrl}/${dongBasePath}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });

        // 해당 동의 샵 상세 페이지들 (/region/district/dong/shop/1 ~ 5)
        [1, 2, 3, 4, 5].forEach((shopId) => {
          dynamicRegionRoutes.push({
            url: `${baseUrl}/${dongBasePath}/shop/${shopId}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        });
      });
    });
  });

  return [
    ...mainRoute,
    ...categoryRoutes,
    ...shopRoutes,
    ...dynamicRegionRoutes,
    ...healingRegionRoutes,
  ];
}