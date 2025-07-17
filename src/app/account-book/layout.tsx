// export const metadata = {
//   title: "가계부",
//   description: "가계부 페이지",
// };

import BottomNavigation from "./BottomNavigation";

export default function AccountBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      {children}
      <BottomNavigation />
    </main>
  );
}
