import Header from "./_components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-5 gap-5">
      <Header />
      {children}
    </div>
  );
}
