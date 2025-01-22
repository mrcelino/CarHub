import Sidebar from "./components/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Layout UI */}
      {/* Place children where you want to render a page or nested layout */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
