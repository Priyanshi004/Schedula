// app/home/layout.tsx

import BottomNav from "@/components/BottomNav";
import ClientLayout from "@/components/ClientLayout";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      {/* Scrollable page content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
        <ClientLayout>
            {children}
        </ClientLayout>
      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
