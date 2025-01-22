"use client";

import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList/CategoryList";

export default function CategoryPage() {
  return (
    <div className="p-6 space-y-8">
      <CategoryForm />
      <CategoryList />
    </div>
  );
}
