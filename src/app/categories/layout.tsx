import { BackButton } from "./_components";

export const metadata = {
  title: "My Timer 사진 폴더 선택",
  description: "사진 폴더를 선택하는 페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-full bg-gray-50">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[1024px] flex">
          <BackButton className="p-3" />
        </div>
      </div>

      {children}
    </main>
  );
}
