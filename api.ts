import axios from 'axios'

type DateRange = {
  from: string
  to: string
}

// 📨 Fetch SMS delivery logs (with date filter)
export const getSmsLogs = async (range: DateRange) => {
  try {
    const { data } = await axios.get('/api/communication/sms-logs', {
      params: range,
    })
    return data
  } catch (error) {
    console.error('Error fetching SMS logs:', error)
    throw error
  }
}

// 📊 Get summary cards data (credit stats / usage breakdown)
export const getSummaryData = async () => {
  try {
    const { data } = await axios.get('/api/communication/summary')
    return data
  } catch (error) {
    console.error('Error fetching summary data:', error)
    throw error
  }
}

// 📤 Export report as PDF or CSV
export const exportReport = async (type: 'pdf' | 'csv') => {
  try {
    const { data } = await axios.get('/api/communication/export', {
      params: { type },
      responseType: 'blob', // for downloading files
    })
    return data
  } catch (error) {
    console.error(`Error exporting ${type} report:`, error)
    throw error
  }
}

// ✉️ Email report to someone
export const emailReport = async (payload: {
  recipient: string
  message?: string
}) => {
  try {
    const { data } = await axios.post('/api/communication/email', payload)
    return data
  } catch (error) {
    console.error('Error sending email report:', error)
    throw error
  }
}