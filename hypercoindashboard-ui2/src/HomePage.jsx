import { useTheme } from "./ThemeContext";

export default function HomePage({ onEnter }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={container(theme)}>
      <div style={centerBox}>
        <h1 style={title(theme)}>🌐 HyperCoin</h1>
        <h2 style={subTitle(theme)}>Your New Digital Bank</h2>
        <p style={tagline(theme)}>The more you spend, the less tax you pay.</p>

        <button onClick={onEnter} style={btn}>🚀 Launch Dashboard</button>
        <button onClick={toggleTheme} style={toggleBtn}>
          Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}

const container = (theme) => ({
  backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc",
  color: theme === "dark" ? "#fff" : "#000",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const centerBox = {
  textAlign: "center",
};

const title = (theme) => ({
  fontSize: "3rem",
  marginBottom: "0.5rem",
  color: theme === "dark" ? "#60a5fa" : "#0ea5e9",
});

const subTitle = (theme) => ({
  fontSize: "1.5rem",
  fontWeight: "normal",
  color: theme === "dark" ? "#a5f3fc" : "#0369a1",
});

const tagline = (theme) => ({
  fontSize: "1rem",
  marginBottom: "2rem",
  color: theme === "dark" ? "#e2e8f0" : "#1e293b",
});

const btn = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "12px 20px",
  fontSize: "1rem",
  border: "none",
  borderRadius: "6px",
  marginBottom: "1rem",
  cursor: "pointer",
};

const toggleBtn = {
  backgroundColor: "#4b5563",
  color: "#fff",
  padding: "8px 16px",
  fontSize: "0.9rem",
  border: "none",
  borderRadius: "6px",
  marginLeft: "1rem",
  cursor: "pointer",
};
