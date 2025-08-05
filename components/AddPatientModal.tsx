'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaPlus, FaUserMd, FaTimes } from 'react-icons/fa'

type Patient = {
  name: string
  mobile: string
  email: string
  gender: string
  dob: string
  city: string
}

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default function AddPatientModal({
  onSave,
}: {
  onSave: (patient: Patient) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Patient>({
    name: '',
    mobile: '',
    email: '',
    gender: '',
    dob: '',
    city: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert('Please fill in required fields (Name and Mobile)')
      return
    }
    onSave(formData)
    setFormData({ name: '', mobile: '', email: '', gender: '', dob: '', city: '' })
    setIsOpen(false)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
      >
        <FaPlus className="text-sm" />
        <span>Add Patient</span>
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-6 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FaUserMd className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Add New Patient</h2>
                <p className="text-blue-100 text-sm">Enter patient information</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <FaTimes className="text-white text-sm" />
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter patient's full name"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <p className="text-xs text-gray-500">* Required fields</p>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Save Patient
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}