export interface JobRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  totalHours?: number;
  notes?: string;
  isComplete: boolean;
}

export interface JobStats {
  totalDays: number;
  totalHours: number;
  averageHours: number;
  currentStreak: number;
  longestStreak: number;
  thisWeekHours: number;
  thisMonthHours: number;
}

export interface JobSettings {
  workStartTime: string;
  workEndTime: string;
  breakTime: number;
}
