import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import { useState } from 'react';
import { LangContext, type Lang } from './lib/i18n';
import { LandingPage } from './pages/LandingPage/LandingPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '*', loader: () => redirect('/') },
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
