import React from "react";

function Login() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Login</h2>
      <form className="mt-4 space-y-2">
        <input className="border p-2 w-full" type="email" placeholder="Email" />
        <input className="border p-2 w-full" type="password" placeholder="Password" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
