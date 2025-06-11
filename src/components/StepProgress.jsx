import React from 'react';
import {
  MapPin,
  Trash2,
  Truck,
  ShieldCheck,
  Calendar,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const steps = [
  { icon: <MapPin size={20} />, label: "Postcode", path: "/postcode", id: "postcode" },
  { icon: <Trash2 size={20} />, label: "Waste Type", path: "/waste-type", id: "waste-type" },
  { icon: <Truck size={20} />, label: "Select Skip", path: "/", id: "select-skip" },
  { icon: <ShieldCheck size={20} />, label: "Permit Check", path: "/permit-check", id: "permit-check" },
  { icon: <Calendar size={20} />, label: "Choose Date", path: "/date", id: "date" },
  { icon: <CreditCard size={20} />, label: "Payment", path: "/payment", id: "payment" },
];

export default function StepProgress() {
  // Get current URL path
  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/'; // fallback
  };

  const [currentPath, setCurrentPath] = React.useState(getCurrentPath());

  // Listen for URL changes
  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', handleLocationChange);
    
    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      handleLocationChange();
    };

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Find current step index with better path matching
  const getCurrentStepIndex = () => {
    if (currentPath === '/' || currentPath === '') return 2; // Select Skip step
    if (currentPath.startsWith('/postcode')) return 0;
    if (currentPath.startsWith('/waste-type')) return 1;
    if (currentPath.startsWith('/permit-check')) return 3;
    if (currentPath.startsWith('/date')) return 4;
    if (currentPath.startsWith('/payment')) return 5;
    return 2; // Default to Select Skip step (root)
  };
  
  const currentStepIndex = getCurrentStepIndex();
  
  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full">
      <div className="px-4 py-6 mb-8">
      {/* Desktop View */}
      <div className="hidden lg:flex justify-center items-center max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          
          return (
            <div key={index} className="flex items-center group">
              {/* Step Circle */}
              <div className="relative">
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ease-out
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 scale-105' 
                    : isCurrent 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/40 scale-110 animate-pulse' 
                    : 'bg-gray-700/50 backdrop-blur-sm border border-gray-600/30'
                  }
                `}>
                  <div className={`
                    transition-all duration-300
                    ${isCompleted ? 'text-white' : isCurrent ? 'text-white' : 'text-gray-400'}
                  `}>
                    {isCompleted ? <CheckCircle size={24} /> : step.icon}
                  </div>
                </div>
                
                {/* Glow effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 animate-ping"></div>
                )}
              </div>
              
              {/* Step Label */}
              <div className="ml-4 min-w-0">
                <p className={`
                  font-semibold text-sm transition-all duration-300
                  ${isCompleted 
                    ? 'text-emerald-400' 
                    : isCurrent 
                    ? 'text-white' 
                    : 'text-gray-500'
                  }
                `}>
                  {step.label}
                </p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-8 h-px relative">
                  <div className="absolute inset-0 bg-gray-700"></div>
                  <div className={`
                    absolute inset-0 transition-all duration-700 ease-out
                    ${index < currentStepIndex 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm shadow-emerald-500/20' 
                      : 'bg-transparent'
                    }
                  `}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ 
                width: `${((currentStepIndex) / (steps.length - 1)) * 100}%`,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
            ></div>
          </div>
          <div className="text-right mt-2">
            <span className="text-xs font-medium text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Current Step Display */}
        <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <div className="text-white">
                {steps[currentStepIndex]?.icon}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">
                {steps[currentStepIndex]?.label}
              </h3>
              <p className="text-gray-400 text-sm">
                Complete this step to continue
              </p>
            </div>
          </div>
        </div>

        {/* Step List */}
        <div className="mt-6 space-y-3">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div 
                key={index} 
                className={`
                  flex items-center p-3 rounded-xl transition-all duration-300
                  ${isCurrent 
                    ? 'bg-blue-600/20 border border-blue-500/30' 
                    : isCompleted 
                    ? 'bg-emerald-600/10 border border-emerald-500/20' 
                    : 'bg-gray-800/30 border border-gray-700/30'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400'
                  }
                `}>
                  {isCompleted ? <CheckCircle size={16} /> : React.cloneElement(step.icon, { size: 16 })}
                </div>
                
                <span className={`
                  text-sm font-medium transition-colors duration-300
                  ${isCompleted 
                    ? 'text-emerald-400' 
                    : isCurrent 
                    ? 'text-white' 
                    : 'text-gray-500'
                  }
                `}>
                  {step.label}
                </span>
                
                {isCurrent && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                )}
                
                {isCompleted && (
                  <div className="ml-auto">
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}