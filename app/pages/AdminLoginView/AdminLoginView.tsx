import React, { useState } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // HARDCODED ADMIN CREDS
    const adminUsername = "admin";
    const adminPassword = "admin123&";

    // CHECK IF THE ENTERED CREDS MATCH THE HARDCODED ONES
    if (username === adminUsername && password === adminPassword) {
      // STORE ADMIN INFO IN SESSION STORAGE
      sessionStorage.setItem("adminCreds", JSON.stringify({ username }));

      // REDIRECT TO HOME VIEW
      window.location.href = "/";
    } else {
      setError("Invalid credentials, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
