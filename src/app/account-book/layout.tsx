// export const metadata = {
//   title: "가계부",
//   description: "가계부 페이지",
// };

import BottomNavigation, { BOTTOM_NAVIGATION_HEIGHT } from "./BottomNavigation";

export default function AccountBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-full"
      style={{ paddingBottom: BOTTOM_NAVIGATION_HEIGHT }}
    >
      {children}
      <BottomNavigation />
    </main>
  );
}
