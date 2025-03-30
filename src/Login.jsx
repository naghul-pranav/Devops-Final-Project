import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "naghul-pranav" && password === "Naghul@123") {
      onLogin();
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "400px",
        maxWidth: "90%"
      }}>
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          marginBottom: "20px",
          textAlign: "center",
          color: "#333"
        }}>
          Pet Adoption Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#555"
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                borderRadius: "5px",
                fontSize: "16px"
              }}
              placeholder="Enter username"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#555"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                borderRadius: "5px",
                fontSize: "16px"
              }}
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p style={{ 
              color: "red", 
              marginBottom: "20px",
              textAlign: "center"
            }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{ 
              width: "100%",
              padding: "12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
          >
            Login
          </button>
        </form>
        <div style={{ 
          marginTop: "20px",
          textAlign: "center",
          color: "#777",
          fontSize: "14px"
        }}>
          <p>Demo credentials:</p>
          <p>Username: naghul-pranav</p>
          <p>Password: Naghul@123</p>
        </div>
      </div>
    </div>
  );
}