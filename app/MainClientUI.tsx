"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 서울, 경기, 인천 지역 및 구·동 데이터
const regionData: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1.2.3.4가동", "종로5.6가동", "이화동", "혜화동", "창신1동", "창신2동", "창신3동", "숭인1동", "숭인2동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로1동", "원효로2동", "효창동", "용문동", "이촌1동", "이촌2동", "이태원1동", "이태원2동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리2동", "왕십리도선동", "마장동", "사근동", "행당1동", "행당2동", "응봉동", "금호1가동", "금호2.3가동", "금호4가동", "옥수동", "성수1가1동", "성수1가2동", "성수2가1동", "성수2가3동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡1동", "중곡2동", "중곡3동", "중곡4동", "능동", "구의1동", "구의2동", "구의3동", "광장동", "자양1동", "자양2동", "자양3동", "자양4동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농1동", "전농2동", "답십리1동", "답십리2동", "장안1동", "장안2동", "청량리동", "회기동", "휘경1동", "휘경2동", "이문1동", "이문2동"] },
      jungnang: { name: "중랑구", dongs: ["면목본동", "면목2동", "면목3.4동", "면목5동", "면목7동", "상봉1동", "상봉2동", "중화1동", "중화2동", "묵1동", "묵2동", "망우본동", "망우3동", "신내1동", "신내2동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암1동", "돈암2동", "안암동", "보문동", "정릉1동", "정릉2동", "정릉3동", "정릉4동", "길음1동", "길음2동", "종암동", "월곡1동", "월곡2동", "장위1동", "장위2동", "장위3동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "삼각산동", "번1동", "번2동", "번3동", "수유1동", "수유2동", "수유3동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창1동", "창2동", "창3동", "창4동", "창5동", "도봉1동", "도봉2동", "쌍문1동", "쌍문2동", "쌍문3동", "쌍문4동", "방학1동", "방학2동", "방학3동"] },
      nowon: { name: "노원구", dongs: ["상계1동", "상계2동", "상계3.4동", "상계5동", "상계6.7동", "상계8동", "상계9동", "상계10동", "중계본동", "중계1동", "중계2.3동", "중계4동", "하계1동", "하계2동", "공릉1동", "공릉2동"] },
      eunpyeong: { name: "은평구", dongs: ["불광1동", "불광2동", "갈현1동", "갈현2동", "구산동", "대조동", "응암1동", "응암2동", "응암3동", "역촌동", "신사1동", "신사2동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제1동", "홍제2동", "홍제3동", "홍은1동", "홍은2동", "남가좌1동", "남가좌2동", "북가좌1동", "북가좌2동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원1동", "망원2동", "연남동", "성산1동", "성산2동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목1동", "목2동", "목3동", "목4동", "목5동", "신월1동", "신월2동", "신월3동", "신월4동", "신월5동", "신월6동", "신월7동", "신정1동", "신정2동", "신정3동", "신정4동", "신정6동", "신정7동"] },
      gangseo: { name: "강서구", dongs: ["등촌1동", "등촌2동", "등촌3동", "화곡본동", "화곡1동", "화곡2동", "화곡3동", "화곡4동", "화곡6동", "화곡8동", "우장산동", "가양1동", "가양2동", "가양3동", "발산1동", "공항동", "방화1동", "방화2동", "방화3동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로1동", "구로2동", "구로3동", "구로4동", "구로5동", "가리봉동", "고척1동", "고척2동", "개봉1동", "개봉2동", "개봉3동", "오류1동", "오류2동", "수궁동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산1동", "독산2동", "독산3동", "독산4동", "시흥1동", "시흥2동", "시흥3동", "시흥4동", "시흥5동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포본동", "영등포동", "여의동", "당산1동", "당산2동", "도림동", "문래동", "양평1동", "양평2동", "신길1동", "신길3동", "신길4동", "신길5동", "신길6동", "신길7동", "대림1동", "대림2동", "대림3동"] },
      dongjak: { name: "동작구", dongs: ["노량진1동", "노량진2동", "상도1동", "상도2동", "상도3동", "상도4동", "흑석동", "사당1동", "사당2동", "사당3동", "사당4동", "사당5동", "대방동", "신대방1동", "신대방2동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "상현동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
      seocho: { name: "서초구", dongs: ["서초1동", "서초2동", "서초3동", "서초4동", "잠원동", "반포본동", "반포1동", "반포2동", "반포3동", "반포4동", "방배본동", "방배1동", "방배2동", "방배3동", "방배4동", "양재1동", "양재2동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["역삼1동", "역삼2동", "개포1동", "개포2동", "개포4동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "대치4동", "신사동", "논현1동", "논현2동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡1동", "도곡2동"] },
      songpa: { name: "송파구", dongs: ["잠실본동", "잠실2동", "잠실3동", "잠실4동", "잠실6동", "잠실7동", "풍납1동", "풍납2동", "거여1동", "거여2동", "마천1동", "마천2동", "방이1동", "방이2동", "오륜동", "오금동", "송파1동", "송파2동", "석촌동", "삼전동", "가락본동", "가락1동", "가락2동", "문정1동", "문정2동", "장지동", "위례동", "잠실동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일1동", "상일2동", "명일1동", "명일2동", "고덕1동", "고덕2동", "암사1동", "암사2동", "암사3동", "천호1동", "천호2동", "천호3동", "성내1동", "성내2동", "성내3동", "둔촌1동", "둔촌2동"] },
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자1동", "정자2동", "정자3동", "영화동", "송죽동", "조원1동", "조원2동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류1동", "세류2동", "세류3동", "권선1동", "권선2동", "곡선동", "평동", "호매실동", "서둔동", "금곡동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서1동", "화서2동", "지동", "우만1동", "우만2동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄1동", "매탄2동", "매탄3동", "매탄4동", "원천동", "영통1동", "영통2동", "영통3동", "망포1동", "망포2동", "광교1동", "광교2동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동", "단대동", "산성동", "양지동", "복정동", "위례동", "신촌동", "고등동", "창곡동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광1동", "금광2동", "은행1동", "은행2동", "상대원1동", "상대원2동", "상대원3동", "하대원동", "도촌동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내1동", "수내2동", "수내3동", "정자동", "정자1동", "정자2동", "정자3동", "서현1동", "서현2동", "이매1동", "이매2동", "야탑1동", "야탑2동", "야탑3동", "금곡동", "미금동", "구미동", "판교동", "삼평동", "백현동", "운중동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "가능동", "흥선동", "자금동"] },
      anyang_manan: { name: "안양시 만안구", dongs: ["안양1동", "안양2동", "안양3동", "안양4동", "안양5동", "안양6동", "안양7동", "안양8동", "안양9동", "석수동", "박달동"] },
      anyang_dongan: { name: "안양시 동안구", dongs: ["비산동", "부흥동", "달안동", "관양동", "평촌동", "평안동", "귀인동", "범계동", "호계동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "역곡동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "옥길동", "괴안동", "송내동", "춘의동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "고강동", "원종동", "성곡동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명동", "철산동", "하안동", "소하동", "학온동"] },
      pyeongtaek: { name: "평택시", dongs: ["진위면", "서탄면", "고덕면", "청북읍", "포승읍", "현덕면", "팽성읍", "신장동", "서정동", "송탄동", "지산동", "원평동", "비전동", "소사동", "세교동"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "보산동", "동두천동", "상패동", "중앙동", "송내동", "불현동"] },
      ansan_sangnok: { name: "안산시 상록구", dongs: ["반월동", "사동", "일동", "이동", "본오동", "수암동", "장상동"] },
      ansan_danwon: { name: "안산시 단원구", dongs: ["와동", "고잔동", "초지동", "원곡동", "백운동", "신길동", "성곡동", "대부동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "창릉동", "능곡동", "행신1동", "행신2동", "행신3동", "화정1동", "화정2동", "대덕동", "고양동", "관산동", "성사동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산1동", "중산2동", "정발산동", "풍산동", "백석1동", "백석2동", "마두1동", "마두2동", "장항1동", "장항2동", "고봉동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산1동", "일산2동", "일산3동", "탄현1동", "탄현2동", "주엽1동", "주엽2동", "대화동", "송포동", "덕이동"] },
      gwacheon: { name: "과천시", dongs: ["중앙동", "갈현동", "문원동", "별양동", "부림동", "과천동"] },
      guri: { name: "구리시", dongs: ["갈매동", "동구동", "인창동", "교문1동", "교문2동", "수택1동", "수택2동", "수택3동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "수동면", "조안면", "퇴계원읍", "별내면", "별내동", "금곡동", "양정동", "다산동", "평내동", "호평동", "오남읍"] },
      osan: { name: "오산시", dongs: ["중앙동", "신장동", "세마동", "초평동", "대원동", "남촌동", "세교동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "군자동", "월곶동", "정왕동", "배곧동", "과림동", "연성동"] },
      gunpo: { name: "군포시", dongs: ["군포동", "산본동", "금정동", "재궁동", "오금동", "수리동", "대야미동", "송부동"] },
      uiwang: { name: "의왕시", dongs: ["고천동", "부곡동", "오전동", "내손1동", "내손2동", "청계동"] },
      hanam: { name: "하남시", dongs: ["천현동", "신장동", "덕풍동", "감북동", "위례동", "미사동", "춘궁동", "초이동", "감일동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "남사읍", "원삼면", "백암면", "동부동", "중앙동", "역삼동", "유림동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "마북동", "구성동", "동백동", "보정동", "상갈동", "기흥동", "서농동", "중동", "상하동", "보라동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천1동", "풍덕천2동", "신봉동", "죽전1동", "죽전2동", "동천동", "상현1동", "상현2동", "성복동"] },
      paju: { name: "파주시", dongs: ["문산읍", "조리읍", "법원읍", "파주읍", "탄현면", "광탄면", "월롱면", "적성면", "파평면", "교하동", "운정1동", "운정2동", "운정3동", "금촌동"] },
      icheon: { name: "이천시", dongs: ["창전동", "중리동", "증포동", "부발읍", "장호원읍", "마장면", "대월면", "신둔면", "백사면", "호법면", "설성면", "율면"] },
      anseong: { name: "안성시", dongs: ["공도읍", "죽산면", "삼죽면", "보개면", "금광면", "서운면", "미양면", "대덕면", "원곡면", "양성면", "안성동", "고삼면"] },
      gimpo: { name: "김포시", dongs: ["고촌읍", "통진읍", "대곶면", "월곶면", "하성면", "사우동", "풍무동", "장기동", "구래동", "운양동", "마산동", "장기본동"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "매송면", "비봉면", "팔탄면", "장안면", "양감면", "정남면", "새솔동", "진안동", "병점동", "반월동", "기배동", "화산동", "동탄동"] },
      gwangju_gyeonggi: { name: "광주시", dongs: ["오포읍", "초월읍", "퇴촌면", "남종면", "남한산성면", "송정동", "광남동", "경안동", "쌍령동", "탄벌동"] },
      yangju: { name: "양주시", dongs: ["회천동", "양주동", "백석읍", "은현면", "남면", "장흥면", "고읍동", "옥정동"] },
      pochon: { name: "포천시", dongs: ["소흘읍", "군내면", "내촌면", "가산면", "일동면", "이동면", "영중면", "창수면", "관인면", "화현면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["여흥동", "중앙동", "오학동", "가남읍", "점동면", "능서면", "흥천면", "금사면", "산북면", "대신면"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "백학면", "미산면", "왕징면", "신서면", "중면"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "지평면", "용문면", "개군면", "서종면", "단월면", "청운면"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      jemulpo: { name: "제물포구", dongs: ["신포동", "연안동", "신흥동", "도원동", "율목동", "동인천동", "개항동", "만석동", "화수동", "화평동", "송현동", "송림동", "금창동"] },
      yeongjong: { name: "영종구", dongs: ["영종동", "영종1동", "영종2동", "운서동", "용유동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "장수서창동", "서창동", "남촌도림동", "논현동", "논현고잔동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "일신동", "십정동"] },
      gyeyang: { name: "계양구", dongs: ["효성동", "계산동", "작전동", "작전서운동", "계양동"] },
      sehae: { name: "서해구", dongs: ["연희동", "가정동", "신현원창동", "석남동", "가좌동"] },
      geomdan: { name: "검단구", dongs: ["검암경서동", "청라동", "검단동", "불로대곡동", "원당동", "당하동", "오류왕길동", "마전동", "아라동"] },
      ganghwa: { name: "강화군", dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양동면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"] },
      ongjin: { name: "옹진군", dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"] }
    }
  }
};

const initialLocalShops = [
  { id: 1, name: "한국미녀홈타이", desc: "수도권 주요지역 전문 감성 스웨디시 & 아로마 웰니스 테라피", phone: "0507-1280-3303", price: "100,000원부터~", image: "/shop1.jpg" },
  { id: 2, name: "너무이쁜홈타이", desc: "품격 있는 힐링을 선사하는 정통 타이마사지 및 프라이빗 바디케어", phone: "0507-1280-3190", price: "60,000원부터~", image: "/shop2.jpg" },
  { id: 3, name: "예쁜걸홈타이", desc: "철저한 위생 관리와 쾌적한 릴렉스 아로마 마사지 프로그램", phone: "0507-1280-3185", price: "60,000원부터~", image: "/shop3.jpg" },
  { id: 4, name: "퀸즈홈테라피", desc: "전문 테라피스트들의 1:1 맞춤형 VIP 피로회복 웰니스 케어", phone: "0507-1280-3222", price: "60,000원부터~", image: "/shop4.jpg" },
  { id: 5, name: "한국골든테라피", desc: "정직한 정찰제 운영과 편안한 힐링을 약속하는 감성 스웨디시", phone: "0507-1280-3360", price: "110,000원부터~", image: "/shop5.jpg" }
];

export default function MainClientUI() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  
  const [shuffledShops, setShuffledShops] = useState(initialLocalShops);

  useEffect(() => {
    const shuffled = [...initialLocalShops].sort(() => Math.random() - 0.5);
    setShuffledShops(shuffled);
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  // 🌟 /massage/시/구/동 경로로 정확히 이동하도록 수정된 검색 핸들러
  const handleSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 지역(구/시)을 먼저 선택해주세요!");
      return;
    }
    const districtObj = regionData[selectedRegion]?.districts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;
    
    // /massage 경로 추가
    const baseUrl = `/massage/${selectedRegion}/${encodeURIComponent(districtName)}`;
    
    // 동 선택 여부에 따라 분기
    const targetUrl = selectedDong 
      ? `${baseUrl}/${encodeURIComponent(selectedDong)}` 
      : baseUrl;
    
    router.push(targetUrl);
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs = selectedDistrict && currentDistricts[selectedDistrict] ? currentDistricts[selectedDistrict].dongs : [];

  return (
    <div className="bg-[#0b0b0f] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-black relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12 relative z-10">
        
        {/* 상단 메인 배너 */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative h-64 md:h-84 flex items-center justify-center p-6 group">
            <div className="absolute inset-0 z-0">
              <img src="/banner.jpg" alt="메인 힐링 배너" className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-amber-500/10"></div>
            </div>
            
            <div className="relative z-10 space-y-3.5 max-w-xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                ✨ 서울 경기 인천 웰니스 마사지 플랫폼
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                수도권 전 지역 <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">프리미엄 힐링 마사지 안내</span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium drop-shadow">
                검증된 베테랑 테라피스트의 맞춤형 바디케어! 스웨디시 및 타이마사지 정보를 한눈에 만나보세요.
              </p>
            </div>
          </div>
        </section>

        {/* 제휴업체 리스트 섹션 */}
        <section className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-xs text-amber-400 font-extrabold tracking-widest uppercase">BEST RECOMMENDED SHOPS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              🏆 투데이쿡 추천 프리미엄 웰니스 제휴점
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shuffledShops.map((lShop) => (
              <div key={lShop.id} className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 rounded-2xl p-4 flex gap-4 items-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <img src={lShop.image} alt={lShop.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-amber-500/30" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{lShop.desc}</p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">{lShop.price}</span>
                    <a href={`tel:${lShop.phone}`} className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 지역 선택 및 검색 박스 */}
        <section className="pt-4">
          <div className="bg-gradient-to-b from-[#1c1c22] to-[#121217] border-2 border-amber-500/50 p-6 md:p-8 rounded-3xl max-w-xl mx-auto shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] text-left relative overflow-hidden">
            
            <div className="mb-5">
              <label className="text-xs text-amber-300 font-black uppercase tracking-wider flex items-center gap-1.5">
                📍 내 주변 웰니스 마사지 검색하기
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-gray-300 block mb-1 font-bold">1단계: 시·도 선택</span>
                <select value={selectedRegion} onChange={handleRegionChange} className="bg-black/90 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/40 focus:border-amber-300 transition-colors shadow-inner">
                  {Object.keys(regionData).map((key) => (
                    <option key={key} value={key} className="bg-[#1e1e24] text-white">
                      {regionData[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-300 block mb-1 font-bold">2단계: 구·시·군 선택</span>
                <select value={selectedDistrict} onChange={handleDistrictChange} className="bg-black/90 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/40 focus:border-amber-300 transition-colors shadow-inner">
                  <option value="" className="bg-[#1e1e24] text-gray-400">구 / 시 / 군을 선택해주세요</option>
                  {Object.keys(currentDistricts).map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1e1e24] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-300 block mb-1 font-bold">3단계: 동 선택 (텍스트 필터)</span>
                <select value={selectedDong} onChange={(e) => setSelectedDong(e.target.value)} disabled={!selectedDistrict} className="bg-black/90 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/40 disabled:opacity-30 transition-colors shadow-inner">
                  <option value="" className="bg-[#1e1e24] text-gray-400">동 전체 보기</option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1e1e24] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_30px_rgba(245,158,11,0.6)] mt-2 cursor-pointer transform active:scale-[0.98]"
              >
                🚀 내 주변 웰니스 마사지 모아보기
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}