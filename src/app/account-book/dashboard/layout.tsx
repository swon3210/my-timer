import Navigation from "./Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-6">
      <Navigation />
      {children}
    </div>
  );
}
