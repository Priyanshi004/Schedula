'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { 
  FaComments, 
  FaSms, 
  FaDownload, 
  FaEnvelope, 
  FaChartLine, 
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCreditCard,
  FaFileExcel
} from 'react-icons/fa'

const CommunicationPage = () => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'usage'>('delivery')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  
  const today = new Date()
  const formattedDate = format(today, 'dd MMM yyyy')

  // Mock data for demonstration
  const communicationStats = {
    totalSent: 1247,
    totalFailed: 23,
    successRate: 98.2,
    creditsUsed: 3,
    creditsRemaining: 1029
  }

  const creditInfo = {
    freeCredits: 48,
    paidCredits: 100,
    totalPlanCredits: 1032,
    usedCredits: 3
  }

  const handleDownload = () => {
    const reportData = {
      date: formattedDate,
      smsSent: communicationStats.totalSent,
      smsFailed: communicationStats.totalFailed,
    }

    const csvContent = `Date,SMS Sent,SMS Failed\n${reportData.date},${reportData.smsSent},${reportData.smsFailed}`
    const blob = new Blob([csvContent], { type: 'text/csv' })

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `delivery_report_${formattedDate}.csv`
    a.click()
    
    toast.success('Report downloaded successfully!')
  }

  const handleMailReport = () => {
    toast.success('Report sent to your email!')
  }

  const handleSendExcel = () => {
    if (!selectedMonth) {
      toast.error('Please select a month')
      return
    }
    toast.success('Excel report sent successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaComments className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Communications
              </h1>
              <p className="text-gray-600">
                SMS delivery reports and usage analytics
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <FaCreditCard className="text-green-600" />
              <span>Credits: <strong className="text-green-600">{creditInfo.freeCredits} Free</strong>, <strong className="text-blue-600">{creditInfo.paidCredits} Paid</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaSms className="text-purple-600" />
              <span>SMS: <strong className="text-purple-600">{creditInfo.totalPlanCredits} Total</strong>, <strong className="text-red-600">{creditInfo.usedCredits} Used</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">SMS Sent</p>
              <p className="text-2xl font-bold text-gray-800">{communicationStats.totalSent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Failed SMS</p>
              <p className="text-2xl font-bold text-gray-800">{communicationStats.totalFailed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-gray-800">{communicationStats.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
              <FaCreditCard className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Credits Left</p>
              <p className="text-2xl font-bold text-gray-800">{communicationStats.creditsRemaining}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === 'delivery'
                ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaChartLine className="text-sm" />
            <span>Delivery Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === 'usage'
                ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaCreditCard className="text-sm" />
            <span>Usage Report</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            {/* Date Range Selector */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Select Date Range</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                  Apply Filter
                </button>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SMS Sent Report */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                      <FaCheckCircle className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">SMS Sent</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600">{formattedDate}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {communicationStats.totalSent}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Failed SMS Report */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
                      <FaExclamationTriangle className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Failed SMS</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600">{formattedDate}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {communicationStats.totalFailed}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-end">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaDownload className="text-sm" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={handleMailReport}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaEnvelope className="text-sm" />
                  <span>Mail Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            {/* Usage Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaFileExcel className="text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Generate Usage Report</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  onClick={handleSendExcel}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaFileExcel className="text-sm" />
                  <span>Send Excel</span>
                </button>
              </div>
            </div>

            {/* Credits Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <FaCreditCard className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">SMS Credits Overview</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCreditCard className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Free Credits</p>
                  <p className="text-2xl font-bold text-green-600">{creditInfo.freeCredits}</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCreditCard className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Paid Credits</p>
                  <p className="text-2xl font-bold text-blue-600">{creditInfo.paidCredits}</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCreditCard className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Total Plan Credits</p>
                  <p className="text-2xl font-bold text-purple-600">{creditInfo.totalPlanCredits}</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCreditCard className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Used Credits</p>
                  <p className="text-2xl font-bold text-red-600">{creditInfo.usedCredits}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Credit Usage</span>
                  <span>{creditInfo.usedCredits} / {creditInfo.totalPlanCredits}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-sky-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(creditInfo.usedCredits / creditInfo.totalPlanCredits) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {((1 - creditInfo.usedCredits / creditInfo.totalPlanCredits) * 100).toFixed(1)}% credits remaining
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default CommunicationPage
