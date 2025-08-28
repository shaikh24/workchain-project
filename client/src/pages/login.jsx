import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        {/* Social Login */}
        <button className="flex items-center justify-center w-full py-2 mb-3 border rounded-lg hover:bg-gray-50">
          <FcGoogle className="mr-2 text-xl" /> Continue with Google
        </button>
        <button className="flex items-center justify-center w-full py-2 mb-5 border rounded-lg hover:bg-gray-50">
          <FaApple className="mr-2 text-xl" /> Continue with Apple
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Form */}
        <form>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <Link to="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
