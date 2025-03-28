import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from './header';

export default function Layout() {
  const [rendered, setRendered] = useState(false);
  // Scroll to top on mount
  useEffect(() => {
    // window.scrollTo(0, 0);
    // history.scrollRestoration = 'manual';
  }, []);

  // if (!rendered) {
  //   return null;
  // }

  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
