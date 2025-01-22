"use client";

import ExpenseSummary from "../../components/ExpenseSummary";

export default function Home() {
  return (
    <>
      <div className="mb-5">
        <select className="w-full p-2 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="daily">일별</option>
          <option value="weekly">주별</option>
          <option value="monthly">월별</option>
        </select>
      </div>
      <ExpenseSummary />
    </>
  );
}
