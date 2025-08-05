import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/Input';

export default function DoctorLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to login API
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-900">Doctor Login</h2>

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          whileTap={{ scale: 0.95 }}
        >
          Log In
        </motion.button>
      </form>
    </motion.div>
  );
}
