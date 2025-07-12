export interface JobRecord {
  id: string;
  date: string;
  checkIn?: string; // 출근 시간
  checkOut?: string; // 퇴근 시간
  totalHours?: number; // 총 근무 시간 (시간 단위)
  notes?: string; // 메모
  isComplete: boolean; // 하루 근무 완료 여부
}

export interface JobStats {
  totalDays: number;
  totalHours: number;
  averageHours: number;
  currentStreak: number; // 연속 근무 일수
  longestStreak: number; // 최장 연속 근무 일수
  thisWeekHours: number;
  thisMonthHours: number;
}

export interface JobSettings {
  workDays: number[]; // 0=일요일, 1=월요일, ..., 6=토요일
  targetHours: number; // 목표 근무 시간
  autoCheckIn: boolean; // 자동 출근 체크
  autoCheckOut: boolean; // 자동 퇴근 체크
  notifications: boolean; // 알림 설정
}
