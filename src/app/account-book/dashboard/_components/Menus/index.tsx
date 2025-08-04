import Link from "next/link";

export default function Menus() {
  return (
    <div className="animate-fade-in delay-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">관리</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/account-book/budget/weekly"
          className="p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all hover-lift group text-left block"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            주간 예산 관리
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            카테고리별 주간 예산을 설정하고 관리하세요
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-medium">이번 주 예산</span>
            <span className="text-gray-800 font-bold">₩1,000,000</span>
          </div>
        </Link>

        <Link
          href="/account-book/budget/monthly"
          className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all hover-lift group text-left block"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg
                className="w-6 h-6 text-blue-600"
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
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            월간 예산 관리
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            카테고리별 월간 예산을 설정하고 관리하세요
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 font-medium">이번 달 예산</span>
            <span className="text-gray-800 font-bold">₩2,000,000</span>
          </div>
        </Link>

        <Link
          href="/account-book/budget/yearly"
          className="p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all hover-lift group text-left block"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            연간 예산 관리
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            장기적인 재정 계획을 위한 연간 예산을 설정하세요
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-purple-600 font-medium">올해 예산</span>
            <span className="text-gray-800 font-bold">₩24,000,000</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
