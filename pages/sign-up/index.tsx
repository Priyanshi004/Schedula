// signup/index.tsx
import { useRouter } from 'next/router'

export default function Signup() {
  const router = useRouter()

  return (
    <div className="p-4">
      <h1>User Signup</h1>
      <button
        onClick={() => router.push('/signup/doctor')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Are you a doctor? Sign up here
      </button>
    </div>
  )
}
