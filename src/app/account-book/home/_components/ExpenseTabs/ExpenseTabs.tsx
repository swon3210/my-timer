"use client";

export type TabType = "weekly" | "monthly" | "yearly";

const tabs = [
  { id: "weekly" as TabType, label: "주간 체크" },
  { id: "monthly" as TabType, label: "월간 체크" },
  { id: "yearly" as TabType, label: "연간 체크" },
];

export default function ExpenseTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  return (
    <div className="w-full">
      <div className="relative bg-white rounded-xl p-1 shadow-sm">
        {/* Background slider */}
        <div
          className={`absolute top-1 bottom-1 bg-primary rounded-lg shadow-md transition-all duration-300 ease-in-out ${
            activeTab === "weekly"
              ? "left-1 right-2/3"
              : activeTab === "monthly"
              ? "left-1/3 right-1/3"
              : "left-2/3 right-1"
          }`}
        />

        {/* Tab buttons */}
        <div className="relative flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeTab === tab.id
                    ? "text-gray-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
