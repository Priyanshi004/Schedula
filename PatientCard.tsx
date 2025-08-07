import { FaUserMd, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'

export default function PatientCard({ patient, isSelected = false }: { patient: any; isSelected?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl transition-all duration-300 border ${
      isSelected 
        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-xl border-blue-500' 
        : 'bg-white/80 backdrop-blur-sm shadow-lg border-white/50 hover:shadow-xl hover:bg-white/90'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isSelected 
            ? 'bg-white/20 backdrop-blur-sm' 
            : 'bg-gradient-to-r from-blue-600 to-sky-600'
        }`}>
          <FaUserMd className={`${isSelected ? 'text-white' : 'text-white'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg mb-2 ${
            isSelected ? 'text-white' : 'text-gray-800'
          }`}>
            {patient.name}
          </h3>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaPhone className={`text-sm ${
                isSelected ? 'text-blue-100' : 'text-gray-500'
              }`} />
              <span className={`text-sm ${
                isSelected ? 'text-blue-100' : 'text-gray-600'
              }`}>
                {patient.mobile}
              </span>
            </div>
            
            {patient.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope className={`text-sm ${
                  isSelected ? 'text-blue-100' : 'text-gray-500'
                }`} />
                <span className={`text-sm truncate ${
                  isSelected ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {patient.email}
                </span>
              </div>
            )}
            
            {patient.city && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className={`text-sm ${
                  isSelected ? 'text-blue-100' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  isSelected ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {patient.city}
                </span>
              </div>
            )}
          </div>
          
          {patient.dob && (
            <div className={`mt-2 text-xs ${
              isSelected ? 'text-blue-100' : 'text-gray-500'
            }`}>
              DOB: {new Date(patient.dob).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}