import {
  Coffee,
  Car,
  Home,
  ShoppingBag,
  Heart,
  Gamepad2,
  GraduationCap,
  MoreHorizontal,
  DollarSign,
  Gift,
  TrendingUp,
  Wallet,
  Apple,
  Utensils,
  Plane,
  Train,
  Bus,
  Smartphone,
  Laptop,
  Shirt,
  Zap,
  Droplets,
  Music,
  Film,
  Book,
  Dumbbell,
  Stethoscope,
  Pill,
  Baby,
  Dog,
  Cat,
  Trees,
  MapPin,
  Calendar,
  Clock,
  Star,
  Target,
  Award,
  Briefcase,
  Building,
  Factory,
  Store,
  CreditCard,
  Banknote,
  PiggyBank,
  Receipt,
  Calculator,
  ChartBar,
  TrendingDown,
  Coins,
} from "lucide-react";

export interface CategoryIcon {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: "수입" | "지출" | "투자" | "공통";
}

export const CATEGORY_ICONS: CategoryIcon[] = [
  // 수입 관련 아이콘
  { id: "dollar-sign", name: "달러", icon: DollarSign, category: "수입" },
  { id: "wallet", name: "지갑", icon: Wallet, category: "수입" },
  {
    id: "trending-up",
    name: "상승 트렌드",
    icon: TrendingUp,
    category: "수입",
  },
  { id: "briefcase", name: "서류가방", icon: Briefcase, category: "수입" },
  { id: "building", name: "건물", icon: Building, category: "수입" },
  { id: "gift", name: "선물", icon: Gift, category: "수입" },
  { id: "banknote", name: "지폐", icon: Banknote, category: "수입" },
  { id: "piggy-bank", name: "저금통", icon: PiggyBank, category: "수입" },
  { id: "chart-bar", name: "차트", icon: ChartBar, category: "수입" },
  { id: "coins", name: "동전", icon: Coins, category: "수입" },

  // 지출 - 식비
  { id: "coffee", name: "커피", icon: Coffee, category: "지출" },
  { id: "utensils", name: "식기", icon: Utensils, category: "지출" },
  { id: "apple", name: "사과", icon: Apple, category: "지출" },

  // 지출 - 교통
  { id: "car", name: "자동차", icon: Car, category: "지출" },
  { id: "plane", name: "비행기", icon: Plane, category: "지출" },
  { id: "train", name: "기차", icon: Train, category: "지출" },
  { id: "bus", name: "버스", icon: Bus, category: "지출" },

  // 지출 - 주거/통신
  { id: "home", name: "집", icon: Home, category: "지출" },
  { id: "smartphone", name: "스마트폰", icon: Smartphone, category: "지출" },
  { id: "zap", name: "전기", icon: Zap, category: "지출" },
  { id: "droplets", name: "물", icon: Droplets, category: "지출" },

  // 지출 - 쇼핑/생활용품
  { id: "shopping-bag", name: "쇼핑백", icon: ShoppingBag, category: "지출" },
  { id: "shirt", name: "옷", icon: Shirt, category: "지출" },
  { id: "laptop", name: "노트북", icon: Laptop, category: "지출" },

  // 지출 - 건강/의료
  { id: "heart", name: "하트", icon: Heart, category: "지출" },
  { id: "stethoscope", name: "청진기", icon: Stethoscope, category: "지출" },
  { id: "pill", name: "약", icon: Pill, category: "지출" },
  { id: "dumbbell", name: "덤벨", icon: Dumbbell, category: "지출" },

  // 지출 - 문화/여가
  { id: "gamepad2", name: "게임패드", icon: Gamepad2, category: "지출" },
  { id: "music", name: "음악", icon: Music, category: "지출" },
  { id: "film", name: "영화", icon: Film, category: "지출" },
  { id: "book", name: "책", icon: Book, category: "지출" },

  // 지출 - 교육
  {
    id: "graduation-cap",
    name: "졸업모",
    icon: GraduationCap,
    category: "지출",
  },

  // 지출 - 가족/반려동물
  { id: "baby", name: "아기", icon: Baby, category: "지출" },
  { id: "dog", name: "강아지", icon: Dog, category: "지출" },
  { id: "cat", name: "고양이", icon: Cat, category: "지출" },

  // 투자 관련 아이콘
  {
    id: "trending-down",
    name: "하락 트렌드",
    icon: TrendingDown,
    category: "투자",
  },
  { id: "factory", name: "공장", icon: Factory, category: "투자" },
  { id: "store", name: "상점", icon: Store, category: "투자" },

  // 공통 아이콘
  { id: "credit-card", name: "신용카드", icon: CreditCard, category: "공통" },
  { id: "receipt", name: "영수증", icon: Receipt, category: "공통" },
  { id: "calculator", name: "계산기", icon: Calculator, category: "공통" },
  { id: "map-pin", name: "위치", icon: MapPin, category: "공통" },
  { id: "calendar", name: "달력", icon: Calendar, category: "공통" },
  { id: "clock", name: "시계", icon: Clock, category: "공통" },
  { id: "star", name: "별", icon: Star, category: "공통" },
  { id: "target", name: "타겟", icon: Target, category: "공통" },
  { id: "award", name: "상", icon: Award, category: "공통" },
  { id: "trees", name: "나무", icon: Trees, category: "공통" },
  {
    id: "more-horizontal",
    name: "기타",
    icon: MoreHorizontal,
    category: "공통",
  },
];

// 타입별 아이콘 필터링 함수
export const getIconsByType = (
  type: "INCOME" | "EXPENSE" | "INVESTMENT" | "FLEX"
) => {
  const typeMap = {
    INCOME: "수입",
    EXPENSE: "지출",
    INVESTMENT: "투자",
    FLEX: "공통",
  } as const;

  const targetCategory = typeMap[type];

  return CATEGORY_ICONS.filter(
    (iconItem) =>
      iconItem.category === targetCategory || iconItem.category === "공통"
  );
};

// 아이콘 ID로 아이콘 찾기
export const getIconById = (iconId?: string) => {
  if (!iconId) return CATEGORY_ICONS[CATEGORY_ICONS.length - 1]; // 기본값: 기타
  return (
    CATEGORY_ICONS.find((iconItem) => iconItem.id === iconId) ||
    CATEGORY_ICONS[CATEGORY_ICONS.length - 1]
  );
};

// 기본 아이콘 ID들
export const DEFAULT_ICONS = {
  INCOME: "dollar-sign",
  EXPENSE: "shopping-bag",
} as const;
