import { Layout } from '../../components/Layout/Layout';
import { ServerHealth } from '../../components/ServerHealth/ServerHealth';
import { useBootstrap } from '../../hooks/useBootstrap';
import { useServerStore } from '../../lib/stores/useServerStore';

export function DashboardPage() {
  useBootstrap();
  const loadState = useServerStore((s) => s.loadState);
  const error = useServerStore((s) => s.error);

  return (
    <Layout>
      {loadState === 'loading' && <p>Cargando dashboard…</p>}
      {loadState === 'error' && (
        <p role="alert" style={{ color: 'var(--error)' }}>
          {error}
        </p>
      )}
      {loadState === 'ready' && <ServerHealth />}
    </Layout>
  );
}
