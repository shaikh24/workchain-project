import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// ✅ Backend base URL: .env (Vite) ya fallback
const API =
  import.meta.env.VITE_API_URL || "https://workchain-project-00.onrender.com";

// ========== THEME ==========
const ThemeCtx = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.body.className =
      theme === "light"
        ? "bg-slate-50 text-slate-900"
        : "bg-slate-950 text-slate-100";
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>
  );
}

// ========== API HOOKS ==========
function useApi() {
  const token = localStorage.getItem("token");
  const h = token
    ? { Authorization: "Bearer " + token, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };

  const get = (u) => fetch(API + "/api" + u, { headers: h }).then((r) => r.json());
  const post = (u, b) =>
    fetch(API + "/api" + u, {
      method: "POST",
      headers: h,
      body: JSON.stringify(b),
    }).then((r) => r.json());
  const put = (u, b) =>
    fetch(API + "/api" + u, {
      method: "PUT",
      headers: h,
      body: JSON.stringify(b),
    }).then((r) => r.json());

  return { get, post, put };
}

function useApiAuthed() {
  return useApi();
}

// ========== UI ==========
function Nav() {
  const { theme, setTheme } = React.useContext(ThemeCtx);
  const nav = [
    ["/", "Home"],
    ["/jobs", "Jobs"],
    ["/post", "Post"],
    ["/wallet", "Wallet"],
    ["/profile", "Profile"],
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="font-bold text-xl text-indigo-600">WorkChain</div>
      <div className="flex items-center gap-4">
        {nav.map(([to, label]) => (
          <Link key={to} className="hover:underline" to={to}>
            {label}
          </Link>
        ))}
        <button
          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <Link
          className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-900"
          to="/auth"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold">
          Hybrid freelancing with Pi-powered escrow
        </h1>
        <p className="text-slate-500">
          Online + Offline jobs, Remote + Physical mode, Ratings, Wallet & more.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-slate-100 rounded-xl">Online Work</div>
          <div className="p-4 bg-slate-100 rounded-xl">Offline Work</div>
          <div className="p-4 bg-slate-100 rounded-xl">Premium</div>
        </div>
      </div>
    </div>
  );
}

function Auth() {
  const api = useApi();
  const nav = useNavigate();
  const [email, setEmail] = React.useState("demo@workchain.app");
  const [password, setPassword] = React.useState("demo123");
  const [username, setUsername] = React.useState("demo");
  const [mode, setMode] = React.useState("login");
  const [status, setStatus] = React.useState("");

  const doSignup = async () => {
    const res = await api.post("/auth/signup", { username, email, password });
    if (res.ok) {
      setMode("login");
      setStatus("Signup done, please login");
    } else setStatus(res.error || "Signup failed");
  };

  const doLogin = async () => {
    const res = await api.post("/auth/login", { email, password });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      nav("/");
    } else setStatus(res.error || "Login failed");
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white p-6 rounded-2xl mt-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">
          {mode === "login" ? "Login" : "Create account"}
        </h2>
        {mode === "signup" && (
          <input
            className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-300"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-3 mt-4">
          {mode === "login" ? (
            <button
              className="px-3 py-2 bg-indigo-600 rounded-lg text-white"
              onClick={doLogin}
            >
              Login
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-indigo-600 rounded-lg text-white"
              onClick={doSignup}
            >
              Sign Up
            </button>
          )}
          <button
            className="px-3 py-2 bg-slate-200 rounded-lg"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create account" : "Have account? Login"}
          </button>
        </div>
        <p className="text-red-600 mt-2">{status}</p>
      </div>
    </div>
  );
}

function Jobs() {
  const api = useApi();
  const [jobs, setJobs] = React.useState([]);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    api.get("/jobs").then((r) => setJobs(r.jobs || []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-3">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Search services..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Link
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
            to="/post"
          >
            Post a Job
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {jobs
          .filter((j) => (j.title || "").toLowerCase().includes(q.toLowerCase()))
          .map((j) => (
            <div
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
              key={j._id}
            >
              <div className="text-lg font-semibold">{j.title}</div>
              <div className="text-slate-600">{j.description}</div>
              <div className="mt-2 text-sm text-slate-500">
                {j.category} • {j.type}/{j.mode}
              </div>
              <div className="mt-2 font-bold text-indigo-700">
                {j.budget} {j.currency}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function PostJob() {
  const api = useApiAuthed();
  const [title, setTitle] = React.useState("Logo Design");
  const [description, setDescription] = React.useState("Need a modern logo");
  const [category, setCategory] = React.useState("Design");
  const [type, setType] = React.useState("online");
  const [mode, setMode] = React.useState("remote");
  const [budget, setBudget] = React.useState(5);

  const submit = async () => {
    const res = await api.post("/jobs", {
      title,
      description,
      category,
      type,
      mode,
      budget,
    });
    alert(res.ok ? "Posted" : res.error || "Failed");
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white p-6 rounded-2xl mt-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">Post a Job</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <input
            className="px-3 py-2 rounded-lg border border-slate-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="px-3 py-2 rounded-lg border border-slate-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
          <select
            className="px-3 py-2 rounded-lg border border-slate-300"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>online</option>
            <option>offline</option>
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-slate-300"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option>remote</option>
            <option>physical</option>
          </select>
          <input
            className="px-3 py-2 rounded-lg border border-slate-300"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget (PI)"
          />
        </div>
        <textarea
          className="w-full px-3 py-2 rounded-lg border border-slate-300 mt-3"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button
          className="mt-3 px-3 py-2 bg-indigo-600 rounded-lg text-white"
          onClick={submit}
        >
          Create
        </button>
      </div>
    </div>
  );
}

function Wallet() {
  const api = useApiAuthed();
  const [amount, setAmount] = React.useState(1);
  const [memo, setMemo] = React.useState("Escrow funding");

  const create = async () => {
    const r = await api.post("/payments/create", {
      amount: Number(amount),
      memo,
      metadata: { reason: "escrow" },
    });
    alert(r.ok ? "Payment created (testnet)" : r.error || "Failed");
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white p-6 rounded-2xl mt-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">Wallet</h2>
        <div className="flex gap-3 mt-3">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-indigo-600 rounded-lg text-white"
            onClick={create}
          >
            Create Payment
          </button>
        </div>
        <p className="text-slate-500 mt-2">
          Open in <b>Pi Browser</b> for full payment flow.
        </p>
      </div>
    </div>
  );
}

function Profile() {
  const api = useApiAuthed();
  const [me, setMe] = React.useState(null);
  const [interests, setInterests] = React.useState("");
  const [country, setCountry] = React.useState("Pakistan");
  const [walletAddress, setWallet] = React.useState("");

  React.useEffect(() => {
    api.get("/users/me").then((r) => setMe(r.user || null));
  }, []);

  const save = async () => {
    const res = await api.put("/users/me", {
      interests: interests.split(",").map((s) => s.trim()),
      country,
      walletAddress,
    });
    alert(res.ok ? "Saved" : res.error || "Fail");
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white p-6 rounded-2xl mt-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <input
            className="px-3 py-2 rounded-lg border border-slate-300"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <input
            className="px-3 py-2 rounded-lg border border-slate-300"
            value={walletAddress}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Pi Wallet Address"
          />
          <input
            className="px-3 py-2 rounded-lg border border-slate-300 md:col-span-2"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Interests (comma separated)"
          />
        </div>
        <button
          className="mt-3 px-3 py-2 bg-indigo-600 rounded-lg text-white"
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ========== APP ==========
export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
}
