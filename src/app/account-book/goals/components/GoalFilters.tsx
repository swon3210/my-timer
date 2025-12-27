import { GoalPriority } from "@/domains/account-book/goal/types";

export type GoalFilter = {
  priority: GoalPriority | "ALL";
  sortBy: "DUE_DATE" | "PRIORITY" | "PROGRESS";
};

interface GoalFiltersProps {
  filter: GoalFilter;
  setFilter: (filter: GoalFilter) => void;
  filteredCount: number;
}

export default function GoalFilters({
  filter,
  setFilter,
  filteredCount,
}: GoalFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">우선순위:</span>
          <select
            value={filter.priority}
            onChange={(e) =>
              setFilter({
                ...filter,
                priority: e.target.value as GoalPriority | "ALL",
              })
            }
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">전체</option>
            <option value="HIGH">높음</option>
            <option value="MEDIUM">보통</option>
            <option value="LOW">낮음</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">정렬:</span>
          <select
            value={filter.sortBy}
            onChange={(e) =>
              setFilter({
                ...filter,
                sortBy: e.target.value as "DUE_DATE" | "PRIORITY" | "PROGRESS",
              })
            }
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DUE_DATE">마감일순</option>
            <option value="PRIORITY">우선순위순</option>
            <option value="PROGRESS">달성률순</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">{filteredCount}개의 목표</div>
      </div>
    </div>
  );
}
