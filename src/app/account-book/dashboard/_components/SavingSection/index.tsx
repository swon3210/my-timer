import { useSavingsQuery } from "@/domains/account-book/dashboard/useSavingsQuery";
import { cn } from "@/lib/utils";

export default function SavingSection() {
  const { data: savingsData } = useSavingsQuery();

  const savingsGrowth =
    ((savingsData?.thisMonthSavings ?? 0) /
      (savingsData?.lastMonthSavings ?? 0)) *
    100;

  return (
    <div className="animate-fade-in delay-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">저축 현황</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 총 저축금액 카드 */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="size-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold">지금까지 모은 돈</h4>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold mb-2">
              {savingsData?.totalSavings.toLocaleString()}원
            </p>
            <p className="text-green-100 text-sm mb-4">총 저축금액</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-lg font-bold">
                  {savingsData?.thisMonthSavings.toLocaleString()}원
                </p>
                <p className="text-green-100 text-xs">이번 달</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">
                  {(savingsGrowth * 100).toFixed(2)}%
                </p>
                <p className="text-green-100 text-xs">증가율</p>
              </div>
            </div>
          </div>
        </div>

        {/* 이번 달 저축 현황 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-medium text-gray-700">이번 달 저축 현황</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번 달 저축</p>
                <p className="text-2xl font-bold text-gray-800">
                  {savingsData?.thisMonthSavings.toLocaleString()}원
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  className={cn(
                    "w-4 h-4",
                    savingsGrowth > 0
                      ? "text-green-500"
                      : "text-red-500 rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span
                  className={cn(
                    "text-sm font-medium",
                    savingsGrowth > 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {(savingsGrowth * 100).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">지난 달</p>
                  <p className="text-lg font-bold text-gray-800">
                    {savingsData?.lastMonthSavings.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">월 평균</p>
                  <p className="text-lg font-bold text-gray-800">
                    {Math.round(
                      (savingsData?.totalSavings ?? 0) / 12
                    ).toLocaleString()}
                    원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
