import React from "react";

function Register() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Register</h2>
      <form className="mt-4 space-y-2">
        <input className="border p-2 w-full" type="text" placeholder="Name" />
        <input className="border p-2 w-full" type="email" placeholder="Email" />
        <input className="border p-2 w-full" type="password" placeholder="Password" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
