// import Header from "./_components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col max-w-app-container mx-auto bg-primary md:px-5">
      {/* <Header /> */}
      {children}
    </div>
  );
}
