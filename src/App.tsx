import { createBrowserRouter, RouterProvider } from 'react-router';
import { useState } from 'react';
import { LangContext, type Lang } from './lib/i18n';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
]);

function App() {
  const [lang, setLang] = useState<Lang>('es');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <RouterProvider router={router} />
    </LangContext.Provider>
  );
}

export default App;
