// app/dashboard/doctor/layout.tsx
import DoctorSidebar from '@/components/DoctorSidebar';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-sky-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" />
      
      <DoctorSidebar />
      <main className="flex-1 p-6 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}