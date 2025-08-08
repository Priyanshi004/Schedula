'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Prescription } from '@/types/prescription';
import { PrescriptionList } from '@/components/PrescriptionList';
import { PrescriptionForm } from '@/components/PrescriptionForm';
import { PrescriptionPreview } from '@/components/PrescriptionPreview';
import { FaClipboardList, FaSearch, FaPlus, FaFilter } from 'react-icons/fa';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [grouping, setGrouping] = useState<'patient' | 'appointment'>('patient');
  const [patientFilter, setPatientFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);
  const [viewingPrescription, setViewingPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch prescriptions from API
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Filter prescriptions based on patient filter
  useEffect(() => {
    if (patientFilter) {
      const filtered = prescriptions.filter(prescription => 
        prescription.patientName.toLowerCase().includes(patientFilter.toLowerCase())
      );
      setFilteredPrescriptions(filtered);
    } else {
      setFilteredPrescriptions(prescriptions);
    }
  }, [patientFilter, prescriptions]);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('/api/prescriptions');
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      } else {
        console.error('Failed to fetch prescriptions');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrescription = () => {
    setEditingPrescription(null);
    setShowForm(true);
  };

  const handleEditPrescription = (prescription: Prescription) => {
    setEditingPrescription(prescription);
    setShowForm(true);
  };

  const handleViewPrescription = (prescription: Prescription) => {
    setViewingPrescription(prescription);
  };

  const handleDeletePrescription = async (id: string) => {
    try {
      const response = await fetch(`/api/prescriptions/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove prescription from state
        setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
        toast.success('Prescription deleted successfully');
      } else {
        toast.error('Failed to delete prescription');
      }
    } catch (error) {
      console.error('Error deleting prescription:', error);
      toast.error('Error deleting prescription');
    }
  };

  const handleSavePrescription = async (prescriptionData: Partial<Prescription>) => {
    setIsSaving(true);
    try {
      if (editingPrescription) {
        // Update existing prescription
        const response = await fetch(`/api/prescriptions/${editingPrescription.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prescriptionData),
        });
        
        if (response.ok) {
          const updatedPrescription = await response.json();
          setPrescriptions(prev => 
            prev.map(p => p.id === editingPrescription.id ? updatedPrescription : p)
          );
          setShowForm(false);
          setEditingPrescription(null);
          toast.success('Prescription updated successfully');
        } else {
          toast.error('Failed to update prescription');
        }
      } else {
        // Create new prescription
        const response = await fetch('/api/prescriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...prescriptionData,
            // In a real app, these would come from the current user/session
            doctorId: prescriptionData.doctorId || 'doc-1',
            doctorName: prescriptionData.doctorName || 'Dr. Smith',
          }),
        });
        
        if (response.ok) {
          const newPrescription = await response.json();
          setPrescriptions(prev => [...prev, newPrescription]);
          setShowForm(false);
          toast.success('Prescription created successfully');
        } else {
          const errorData = await response.json();
          toast.error(`Failed to create prescription: ${errorData.error}`);
        }
      }
    } catch (error) {
      console.error('Error saving prescription:', error);
      toast.error('Error saving prescription');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPrescription(null);
  };

  const totalPrescriptions = prescriptions.length;
  const totalPatients = new Set(prescriptions.map(p => p.patientId)).size;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Prescription Management
              </h1>
              <p className="text-gray-600">
                {totalPrescriptions > 0 ? `Managing ${totalPrescriptions} prescriptions for ${totalPatients} patients` : 'Add your first prescription to get started'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleAddPrescription}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <FaPlus className="text-sm" />
            <span>Add Prescription</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Prescriptions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Prescriptions</p>
              <p className="text-2xl font-bold text-gray-800">{totalPrescriptions}</p>
            </div>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-gray-800">{totalPatients}</p>
            </div>
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Prescriptions</p>
              <p className="text-2xl font-bold text-gray-800">{prescriptions.filter(p => p.status !== 'expired').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={patientFilter}
              onChange={(e) => setPatientFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Grouping Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select 
              value={grouping} 
              onChange={(e) => setGrouping(e.target.value as 'patient' | 'appointment')}
              className="px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="patient">Group by Patient</option>
              <option value="appointment">Group by Appointment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prescription List */}
      {!viewingPrescription && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Prescriptions
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {filteredPrescriptions.length} prescriptions {patientFilter ? 'found' : 'total'}
            </p>
          </div>
          
          <div className="p-6">
            <PrescriptionList
              prescriptions={filteredPrescriptions}
              onEdit={handleEditPrescription}
              onDelete={handleDeletePrescription}
              onView={handleViewPrescription}
              grouping={grouping}
            />
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PrescriptionForm
              prescription={editingPrescription || undefined}
              onSave={handleSavePrescription}
              onCancel={handleCloseForm}
              isLoading={isSaving}
            />
          </motion.div>
        </div>
      )}

      {/* Prescription Preview */}
      {viewingPrescription && (
        <PrescriptionPreview
          prescription={viewingPrescription}
          onBack={() => setViewingPrescription(null)}
        />
      )}
    </div>
  );
}