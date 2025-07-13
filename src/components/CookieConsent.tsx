
import { useState, useEffect } from "react";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(cookieConsent);
        setPreferences(prev => ({ ...prev, ...savedPrefs }));
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
    };
    setPreferences(newPreferences);
    saveCookiePreferences(newPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
    };
    setPreferences(newPreferences);
    saveCookiePreferences(newPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCookiePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    
    // Here you would typically initialize/disable analytics scripts
    // based on the user's preferences
    if (prefs.analytics) {
      // Initialize Google Analytics or other analytics
      console.log('Analytics cookies enabled');
    } else {
      // Disable analytics
      console.log('Analytics cookies disabled');
    }
  };

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-blue-600 shadow-2xl z-50 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  This website uses cookies to improve functionality, analyze traffic, and provide personalized content. 
                  We respect your privacy and comply with Kenya's Data Protection Act (2019).{" "}
                  <Link to="/cookie-policy" className="text-blue-600 hover:text-blue-800 underline">
                    Learn more in our Cookie Policy
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Cookie Settings</span>
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Accept All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Choose which cookies you want to allow. You can change these settings at any time, 
                  but some features may not work properly if you disable certain cookies.
                </p>

                {/* Necessary Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Necessary Cookies
                    </h3>
                    <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      <span className="text-green-800 dark:text-green-200 text-xs font-medium">
                        Always Active
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies are essential for the website to function properly and cannot be switched off. 
                    They are usually set in response to actions made by you which amount to a request for services.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Functional Cookies
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        preferences.functional ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          preferences.functional ? 'translate-x-5' : 'translate-x-0'
                        } mt-0.5 ml-0.5`}></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences, language settings, and providing chat functionality.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Analytics Cookies
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                        } mt-0.5 ml-0.5`}></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our website and services.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
