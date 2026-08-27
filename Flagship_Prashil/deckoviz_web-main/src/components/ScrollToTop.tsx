import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Handle hash changes (like clicking the same link)
    if (hash === '') {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

export default ScrollToTop; 