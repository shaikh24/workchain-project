import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form className="space-y-3">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Back to{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
