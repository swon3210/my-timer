"use client";

import { useState, useEffect } from "react";
import { JobRecord, JobStats } from "@/types/job";
import Calendar from "./_components/Calendar";
import TimeDisplay from "./_components/TimeDisplay";
import CheckInOutButton from "./_components/CheckInOutButton";
import JobRecordDisplay from "./_components/JobRecord";
import Stats from "./_components/Stats";

export default function JobTrackerPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWorking, setIsWorking] = useState(false);
  const [todayRecord, setTodayRecord] = useState<JobRecord | null>(null);
  const [selectedDateRecord, setSelectedDateRecord] =
    useState<JobRecord | null>(null);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [stats, setStats] = useState<JobStats>({
    totalDays: 0,
    totalHours: 0,
    averageHours: 0,
    currentStreak: 0,
    longestStreak: 0,
    thisWeekHours: 0,
    thisMonthHours: 0,
  });

  // 샘플 데이터 - 실제로는 API에서 불러올 데이터
  const [jobRecords, setJobRecords] = useState<JobRecord[]>([
    {
      id: "2024-01-15",
      date: "2024-01-15",
      checkIn: "09:00",
      checkOut: "18:00",
      totalHours: 9,
      notes: "정상 근무",
      isComplete: true,
    },
    {
      id: "2024-01-16",
      date: "2024-01-16",
      checkIn: "08:45",
      checkOut: "17:30",
      totalHours: 8.75,
      notes: "조금 일찍 퇴근",
      isComplete: true,
    },
    {
      id: "2024-01-17",
      date: "2024-01-17",
      checkIn: "09:15",
      checkOut: "19:00",
      totalHours: 9.75,
      notes: "야근",
      isComplete: true,
    },
    // 현재 월 테스트용 데이터
    {
      id: "2025-07-10",
      date: "2025-07-10",
      checkIn: "09:00",
      checkOut: "18:00",
      totalHours: 9,
      notes: "정상 근무",
      isComplete: true,
    },
    {
      id: "2025-07-11",
      date: "2025-07-11",
      checkIn: "08:30",
      checkOut: "17:30",
      totalHours: 9,
      notes: "조금 일찍 출근",
      isComplete: true,
    },
    {
      id: "2025-07-12",
      date: "2025-07-12",
      checkIn: "09:15",
      checkOut: "19:15",
      totalHours: 10,
      notes: "야근",
      isComplete: true,
    },
  ]);

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 이번 달 통계 계산
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 이번 달 기록만 필터링
    const thisMonthRecords = jobRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === currentYear &&
        recordDate.getMonth() === currentMonth &&
        record.isComplete
      );
    });

    // 이번 주 기록만 필터링
    const thisWeekRecords = jobRecords.filter((record) => {
      const recordDate = new Date(record.date);
      const recordWeek = getWeekOfYear(recordDate);
      const currentWeek = getWeekOfYear(currentDate);
      return (
        recordDate.getFullYear() === currentYear &&
        recordWeek === currentWeek &&
        record.isComplete
      );
    });

    // 통계 계산
    const totalDays = thisMonthRecords.length;
    const totalHours = thisMonthRecords.reduce(
      (sum, record) => sum + (record.totalHours || 0),
      0
    );
    const averageHours =
      totalDays > 0 ? Math.round((totalHours / totalDays) * 100) / 100 : 0;
    const thisWeekHours = thisWeekRecords.reduce(
      (sum, record) => sum + (record.totalHours || 0),
      0
    );
    const thisMonthHours = totalHours;

    // 연속 근무일 계산
    const sortedRecords = [...thisMonthRecords].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < sortedRecords.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedRecords[i - 1].date);
        const currDate = new Date(sortedRecords[i].date);
        const dayDiff =
          (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

        if (dayDiff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    }

    currentStreak = tempStreak;

    setStats({
      totalDays,
      totalHours: Math.round(totalHours * 100) / 100,
      averageHours,
      currentStreak,
      longestStreak,
      thisWeekHours: Math.round(thisWeekHours * 100) / 100,
      thisMonthHours: Math.round(thisMonthHours * 100) / 100,
    });
  }, [jobRecords]);

  // 주차 계산 헬퍼 함수
  const getWeekOfYear = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // 출근 체크
  const handleCheckIn = () => {
    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD 형식으로 로컬 시간 사용
    const checkInTime = new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const newRecord: JobRecord = {
      id: today,
      date: today,
      checkIn: checkInTime,
      isComplete: false,
    };

    setTodayRecord(newRecord);
    setIsWorking(true);

    // 기존 기록에 추가
    setJobRecords((prev) => {
      const existingIndex = prev.findIndex((record) => record.id === today);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newRecord;
        return updated;
      }
      return [...prev, newRecord];
    });
  };

  // 퇴근 체크
  const handleCheckOut = () => {
    if (!todayRecord) return;

    const checkOutTime = new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const checkInTime = new Date(`2000-01-01T${todayRecord.checkIn}:00`);
    const checkOutTimeObj = new Date(`2000-01-01T${checkOutTime}:00`);
    const totalHours =
      (checkOutTimeObj.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

    const updatedRecord: JobRecord = {
      ...todayRecord,
      checkOut: checkOutTime,
      totalHours: Math.round(totalHours * 100) / 100,
      isComplete: true,
    };

    setTodayRecord(updatedRecord);
    setIsWorking(false);

    // 기존 기록 업데이트
    setJobRecords((prev) => {
      const existingIndex = prev.findIndex(
        (record) => record.id === todayRecord.id
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedRecord;
        return updated;
      }
      return [...prev, updatedRecord];
    });
  };

  const handleDateClick = (date: Date) => {
    const dateString = date.toLocaleDateString("en-CA"); // YYYY-MM-DD 형식으로 로컬 시간 사용
    const record = jobRecords.find((r) => r.id === dateString);
    setSelectedDateRecord(record || null);
  };

  // 표시할 기록 결정 (선택된 날짜가 있으면 그것을, 없으면 오늘 기록을)
  const displayRecord = selectedDateRecord || todayRecord;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Job Tracker</h1>
          <p className="text-sm text-gray-600">
            출퇴근 시간을 기록하고 근무 시간을 관리하세요
          </p>
        </div>

        {/* 현재 시간 */}
        <TimeDisplay currentTime={currentTime} />

        {/* 출퇴근 버튼 */}
        <CheckInOutButton
          isWorking={isWorking}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />

        {/* 달력 */}
        <div className="relative">
          <Calendar
            currentDate={currentTime}
            todayRecord={todayRecord}
            jobRecords={jobRecords}
            selectedDate={
              selectedDateRecord ? new Date(selectedDateRecord.date) : null
            }
            onDateClick={handleDateClick}
            isExpanded={isCalendarExpanded}
            onToggleExpand={() => setIsCalendarExpanded(!isCalendarExpanded)}
          />
        </div>

        {/* 기록 */}
        {displayRecord && (
          <JobRecordDisplay
            record={displayRecord}
            isSelectedDate={!!selectedDateRecord}
          />
        )}

        {/* 통계 */}
        <Stats stats={stats} />
      </div>

      {/* 확대된 달력 오버레이 */}
      {isCalendarExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCalendarExpanded(false)}
        />
      )}
    </div>
  );
}
