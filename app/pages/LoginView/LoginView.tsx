import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // CHECKS IF USER EXISTS IN THE FAKESTOREAPI USER ENDPOINT
      const usersResponse = await fetch("https://fakestoreapi.com/users");
      const users = await usersResponse.json();

      const user = users.find((user: { username: string }) => user.username === username);
      if (!user) {
        setError("Invalid username");
        setLoading(false);
        return;
      }

      // CHECKS IF THE PASSWORD MATCHES INPUTED USER
      const loginResponse = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await loginResponse.json();

      if (loginResponse.ok) {
        // IF THE USER IS AUTHENTICATED, SAVE THE JWT AND USER INFO IN SESSION STORAGE
        sessionStorage.setItem("jwt", data.token);
        sessionStorage.setItem("user", JSON.stringify(user));

        
        window.location.href = "/";
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Error during login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">User Login</h2>
      <form onSubmit={handleLogin}>
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

export default Login;
