import { Layout } from "./components/Layout/Layout";
import { ServerHealth } from "./components/ServerHealth/ServerHealth";
import { useBootstrap } from "./hooks/useBootstrap";
import { useServerStore } from "./lib/stores/useServerStore";
import "./App.scss";

function App() {
  useBootstrap();
  const loadState = useServerStore((s) => s.loadState);
  const error = useServerStore((s) => s.error);

  return (
    <Layout>
      {loadState === "loading" && <p>Cargando dashboard…</p>}
      {loadState === "error" && (
        <p role="alert" style={{ color: "var(--err)" }}>
          {error}
        </p>
      )}
      {loadState === "ready" && <ServerHealth />}
    </Layout>
  );
}

export default App;
