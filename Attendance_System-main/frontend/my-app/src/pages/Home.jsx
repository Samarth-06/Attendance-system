import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home( {setIsLoggedIn, isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!domain) {
      alert("Please select a domain.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("selectedDomain", domain);
        navigate("/scan");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error or wrong credentials");
    }
  };

  return (
    <div
  style={{
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    boxSizing: "border-box"
  }}
>
  <div className="mlsc-microsoft-heading">
    <span className="mlsc-m ms">M</span>
    <span className="mlsc-l ms">L</span>
    <span className="mlsc-s ms">S</span>
    <span className="mlsc-c ms">C</span>
    <span className="mlsc-form-text"> Attendance Form</span>
  </div>

  {!isLoggedIn ? (
    <form
      onSubmit={handleLogin}
      style={{
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box"
      }}
    >

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid rgb(240, 245, 332)",
            backgroundColor:"transparent",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="domain"
          style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
        >
          Select Domain:
        </label>
        <select
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid rgb(240, 245, 332)",
            backgroundColor: "transparent",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        >
          <option value="" disabled>Select a domain</option>
          <option value="web">Web Dev</option>
          <option value="cp">CP</option>
          <option value="aids">AI/DS</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
        >
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid rgb(240, 245, 332)",
            backgroundColor:"transparent",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
      >
        Login
      </button>
    </form>
  ) : (
    <p style={{ fontSize: "18px", marginTop: "20px", textAlign: "center" }}>
      Redirecting to scan...
    </p>
  )}

  </div>
  );
}

export default Home;
