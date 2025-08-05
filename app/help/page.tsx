'use client'

import Link from 'next/link'

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'Go to the Find Doctor page, select a specialist, and click Book Appointment.',
    },
    {
      question: 'Can I cancel a booking?',
      answer: 'Yes. Navigate to Appointments and click Cancel on your active booking.',
    },
    {
      question: 'Is payment required before consultation?',
      answer: 'Some doctors require pre-payment. Check appointment details for confirmation.',
    },
  ]

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6">Help & Support</h1>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-md font-semibold text-indigo-700">{faq.question}</h2>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-10 bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-md font-semibold text-indigo-700 mb-2">Still Need Help?</h3>
          <p className="text-sm text-gray-600">You can reach us via email or WhatsApp anytime.</p>
          <div className="mt-3">
            <a href="mailto:support@schedula.in" className="text-indigo-600 underline">support@schedula.in</a>
            <br />
            <a href="https://wa.me/918527000000" className="text-indigo-600 underline">📱 Chat on WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <footer className="sticky bottom-0 w-full bg-white border-t shadow-md">
        <nav className="grid grid-cols-4 text-center text-sm text-gray-700 font-medium">
          <Link href="/doctors" className="py-3 hover:bg-gray-100">🔍 Find Doctor</Link>
          <Link href="/appointments" className="py-3 hover:bg-gray-100">📅 Appointments</Link>
          <Link href="/records" className="py-3 hover:bg-gray-100">📄 Records</Link>
          <Link href="/profile" className="py-3 bg-indigo-50 text-indigo-700">👤 Profile</Link>
        </nav>
      </footer>
    </main>
  )
}
