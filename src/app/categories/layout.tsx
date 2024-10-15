import BackButton from "@/components/BackButton";

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
    <main className="w-full max-w-app-container mx-auto min-h-full">
      <div className="flex items-center h-16 px-2">
        <BackButton />
        <h3 className="text-xl font-semibold">폴더</h3>
      </div>

      {children}
    </main>
  );
}
