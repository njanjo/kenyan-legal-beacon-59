import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Scale } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-950 dark:to-navy-950 px-4">
      <div className="text-center">
        <Scale className="w-12 h-12 text-navy-700 dark:text-gold-400 mx-auto mb-6" />
        <h1 className="font-display text-7xl font-bold text-navy-900 dark:text-gold-400 mb-4">
          404
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-navy-900 dark:bg-gold-500 hover:bg-navy-700 dark:hover:bg-gold-400 text-white dark:text-navy-950 font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;