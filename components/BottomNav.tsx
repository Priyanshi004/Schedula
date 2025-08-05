import Link from 'next/link';
import { FaUserMd, FaUserCircle, FaCalendarCheck } from 'react-icons/fa';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 z-50">
      <Link href="/doctors" className="text-center">
        <FaUserMd className="text-2xl mx-auto text-blue-600" />
        <span className="text-sm">Doctors</span>
      </Link>

      <Link href="/appointments" className="text-center">
        <FaCalendarCheck className="text-2xl mx-auto text-green-600" />
        <span className="text-sm">Appointments</span>
      </Link>

      <Link href="/profile" className="text-center">
        <FaUserCircle className="text-2xl mx-auto text-gray-600" />
        <span className="text-sm">Profile</span>
      </Link>
    </div>
  );
}
