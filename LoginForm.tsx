"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-gray-500 text-sm">Hi there welcome too <span className="text-sky-500 font-medium">Schedula</span></h3>
        <h1 className="text-2xl font-bold text-black mt-1 mb-6">Login</h1>

        {/* Email / Mobile */}
        <label className="block mb-1 font-medium text-sm text-black">Mobile /Email</label>
        <input
          type="text"
          placeholder="login with email or mobile number"
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md mb-4 outline-none focus:ring-2 focus:ring-sky-300"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-sky-500"
            />
            <span>Remember Me</span>
          </label>
          <a href="#" className="text-red-500 text-sm font-medium">Forgot Password</a>
        </div>

        {/* Login Button */}
        <button className="w-full bg-sky-400 hover:bg-sky-500 text-white py-2 rounded-md font-semibold mb-4">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">Or login With</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-2 border border-black
        text-black py-2 rounded-md text-sm font-medium hover:bg-gray-100">
          <FcGoogle className="text-lg" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
