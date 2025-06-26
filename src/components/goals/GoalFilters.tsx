import { Priority } from "@/types/goal";

interface GoalFiltersProps {
  filterPriority: Priority | "all";
  setFilterPriority: (priority: Priority | "all") => void;
  sortBy: "dueDate" | "priority" | "progress";
  setSortBy: (sortBy: "dueDate" | "priority" | "progress") => void;
  filteredCount: number;
}

export default function GoalFilters({
  filterPriority,
  setFilterPriority,
  sortBy,
  setSortBy,
  filteredCount,
}: GoalFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">우선순위:</span>
          <select
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as Priority | "all")
            }
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체</option>
            <option value="high">높음</option>
            <option value="medium">보통</option>
            <option value="low">낮음</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">정렬:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "dueDate" | "priority" | "progress")
            }
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dueDate">마감일순</option>
            <option value="priority">우선순위순</option>
            <option value="progress">달성률순</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">{filteredCount}개의 목표</div>
      </div>
    </div>
  );
}
