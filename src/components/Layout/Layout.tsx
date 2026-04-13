import type { ReactNode } from "react";
import { useServerStore } from "../../lib/stores/useServerStore";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const server = useServerStore((s) => s.server);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span aria-hidden>⚙️</span>
          <strong>FicsitMonitor</strong>
        </div>
        <div className={styles.headerRight}>
          {server ? (
            <span>
              {server.name} · {server.host}:{server.api_port}
            </span>
          ) : (
            <span>Sin servidor seleccionado</span>
          )}
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        FicsitMonitorWeb · dashboard de servidores dedicados Satisfactory
      </footer>
    </div>
  );
}
