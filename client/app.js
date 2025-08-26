const { BrowserRouter, Routes, Route, Link, useNavigate } = ReactRouterDOM;

const API = "https://workchain-server-1.onrender.com"; // apna backend ka link dalna

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

function Nav() {
  const nav = [
    ["/", "Home"],
    ["/jobs", "Jobs"],
    ["/post", "Post"],
    ["/wallet", "Wallet"],
    ["/profile", "Profile"],
  ];
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 shadow">
      <h1 className="font-bold">WorkChain</h1>
      {nav.map(([to, label]) => (
        <Link key={to} to={to} className="hover:underline">
          {label}
        </Link>
      ))}
    </nav>
  );
}

function Home() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Hybrid freelancing with Pi-powered escrow</h2>
      <p>Online + Offline jobs, Remote + Physical mode, Ratings, Wallet & more.</p>
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
    <div className="p-4">
      <h2>{mode === "login" ? "Login" : "Create account"}</h2>

      {mode === "signup" && (
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      )}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <button onClick={mode === "login" ? doLogin : doSignup}>
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "Create account" : "Have account? Login"}
      </button>

      <p>{status}</p>
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
    <div className="p-4">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs" />
      {jobs
        .filter((j) => j.title.toLowerCase().includes(q.toLowerCase()))
        .map((j, i) => (
          <div key={i} className="border p-2 my-2">
            <h3>{j.title}</h3>
            <p>{j.description}</p>
            <p>{j.category} • {j.type}/{j.mode}</p>
            <p>{j.budget} {j.currency}</p>
          </div>
        ))}
    </div>
  );
}

function PostJob() {
  const api = useApi();
  const [title, setTitle] = React.useState("Logo Design");
  const [description, setDescription] = React.useState("Need a modern logo");
  const [category, setCategory] = React.useState("Design");
  const [type, setType] = React.useState("online");
  const [mode, setMode] = React.useState("remote");
  const [budget, setBudget] = React.useState(5);

  const submit = async () => {
    const res = await api.post("/jobs", { title, description, category, type, mode, budget });
    alert(res.ok ? "Posted" : res.error || "Failed");
  };

  return (
    <div className="p-4">
      <h2>Post a Job</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget (PI)" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <button onClick={submit}>Create</button>
    </div>
  );
}

function Wallet() {
  const api = useApi();
  const [amount, setAmount] = React.useState(1);
  const [memo, setMemo] = React.useState("Escrow funding");

  const create = async () => {
    const r = await api.post("/payments/create", { amount: Number(amount), memo, metadata: { reason: "escrow" } });
    alert(r.ok ? "Payment created (testnet)" : r.error || "Failed");
  };

  return (
    <div className="p-4">
      <h2>Wallet</h2>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input value={memo} onChange={(e) => setMemo(e.target.value)} />
      <button onClick={create}>Create Payment</button>
    </div>
  );
}

function Profile() {
  const api = useApi();
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
    <div className="p-4">
      <h2>My Profile</h2>
      <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
      <input value={walletAddress} onChange={(e) => setWallet(e.target.value)} placeholder="Pi Wallet Address" />
      <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Interests (comma separated)" />
      <button onClick={save}>Save</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
