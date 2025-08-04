"use client";

import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList/CategoryList";

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="px-4 py-6 md:px-6">
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                카테고리 관리
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                거래 내역의 카테고리를 추가, 수정, 삭제할 수 있습니다
              </p>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="px-4 md:px-6 pb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="space-y-8">
              {/* 카테고리 추가 폼 */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  새 카테고리 추가
                </h2>
                <CategoryForm />
              </div>

              {/* 카테고리 목록 */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  카테고리 목록
                </h2>
                <CategoryList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
