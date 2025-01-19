export const metadata = {
  title: "가계부",
  description: "가계부 페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="size-full bg-gray-50">
      <div className="size-full max-w-app-container mx-auto flex flex-col">
        {children}
      </div>
    </main>
  );
}
