import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  const navItems = [
    { name: "Home", key: "home" },
    { name: "Auth", key: "auth" },
    { name: "Jobs", key: "jobs" },
    { name: "Post Job", key: "post" },
    { name: "Wallet", key: "wallet" },
    { name: "Profile", key: "profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-400">WorkChain</h1>
          <ul className="flex gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`cursor-pointer transition hover:text-indigo-400 ${
                  page === item.key ? "text-indigo-400" : "text-gray-300"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6">
        {page === "home" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gray-800 shadow-md">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2">Welcome 👋</h2>
              <p className="text-gray-300">
                WorkChain is your decentralized freelancing platform. Post jobs, hire talent, and
                get paid securely with blockchain technology.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-800 shadow-md">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2">Quick Actions</h2>
              <ul className="space-y-2">
                <li className="hover:text-indigo-400 cursor-pointer">➕ Post a Job</li>
                <li className="hover:text-indigo-400 cursor-pointer">👀 Browse Jobs</li>
                <li className="hover:text-indigo-400 cursor-pointer">💳 Connect Wallet</li>
              </ul>
            </div>
          </div>
        )}

        {page === "auth" && (
          <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">Authentication</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
            />
            <button className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold">
              Login
            </button>
          </div>
        )}

        {page === "jobs" && (
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-6">Available Jobs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["Frontend Dev", "Blockchain Engineer", "UI Designer"].map((job, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition shadow-md"
                >
                  <h3 className="font-semibold text-lg">{job}</h3>
                  <p className="text-gray-400 text-sm mt-2">Short description about the job role.</p>
                  <button className="mt-4 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "post" && (
          <div className="max-w-lg mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">Post a Job</h2>
            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-3 mb-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              placeholder="Job Description"
              className="w-full p-3 mb-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
              rows="4"
            ></textarea>
            <button className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-semibold">
              Post Job
            </button>
          </div>
        )}

        {page === "wallet" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2">Wallet Balance</h2>
              <p className="text-3xl font-bold">$2,450</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2">Recent Transactions</h2>
              <ul className="text-gray-300 space-y-1">
                <li>+ $300 from Project A</li>
                <li>- $150 to Freelancer X</li>
                <li>+ $500 from Project B</li>
              </ul>
            </div>
          </div>
        )}

        {page === "profile" && (
          <div className="max-w-lg mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">Profile</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold">
                U
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Name</h3>
                <p className="text-gray-400">user@email.com</p>
              </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 font-semibold">
              Logout
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} WorkChain. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
