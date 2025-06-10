import { useState, useEffect } from "react";
import {
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Star,
  Filter,
  Search,
  ArrowUp,
} from "lucide-react";
import StepProgress from "../components/StepProgress";
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const skips = [
  {
    id: 1,
    size: "4 Yard Skip",
    price: 211,
    hirePeriod: "7 days",
    capacity: "30-40 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
    popular: false,
    eco: true,
    description: "Perfect for small home projects",
  },
  {
    id: 2,
    size: "5 Yard Skip",
    price: 241,
    hirePeriod: "7 days",
    capacity: "50-60 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
    popular: true,
    eco: true,
    description: "Most popular choice for renovations",
  },
  {
    id: 3,
    size: "6 Yard Skip",
    price: 264,
    hirePeriod: "7 days",
    capacity: "70-80 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
    popular: false,
    eco: false,
    description: "Great for larger construction projects",
  },
  {
    id: 4,
    size: "8 Yard Skip",
    price: 295,
    hirePeriod: "7 days",
    capacity: "120-140 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg",
    popular: false,
    eco: true,
    description: "Commercial grade capacity",
  },
  {
    id: 5,
    size: "10 Yard Skip",
    price: 356,
    hirePeriod: "7 days",
    capacity: "180-200 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg",
    popular: false,
    eco: false,
    description: "Maximum capacity for big jobs",
  },
  {
    id: 6,
    size: "12 Yard Skip",
    price: 390,
    hirePeriod: "7 days",
    capacity: "240-260 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg",
    popular: false,
    eco: true,
    description: "Industrial strength solution",
  },
  {
    id: 7,
    size: "14 Yard Skip",
    price: 434,
    hirePeriod: "7 days",
    capacity: "240-260 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/14-yarder-skip.jpg",
    popular: false,
    eco: false,
    description: "Industrial strength solution",
  },
  {
    id: 8,
    size: "16 Yard Skip",
    price: 510,
    hirePeriod: "7 days",
    capacity: "240-260 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/16-yarder-skip.jpg",
    popular: true,
    eco: false,
    description: "Industrial strength solution",
  },
  {
    id: 9,
    size: "20 Yard Skip",
    price: 802,
    hirePeriod: "7 days",
    capacity: "240-260 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg",
    popular: false,
    eco: false,
    description: "Industrial strength solution",
  },
  {
    id: 10,
    size: "40 Yard Skip",
    price: 877,
    hirePeriod: "7 days",
    capacity: "240-260 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg",
    popular: false,
    eco: true,
    description: "Industrial strength solution",
  },
];

const features = [
  { icon: <Shield className="w-5 h-5" />, text: "Fully Insured" },
  { icon: <Clock className="w-5 h-5" />, text: "Same Day Delivery" },
  { icon: <Zap className="w-5 h-5" />, text: "Eco-Friendly" },
  { icon: <Star className="w-5 h-5" />, text: "5★ Rated Service" },
];

function SkipCard({ skip, isSelected, onSelect, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
        isSelected
          ? "ring-2 ring-cyan-400 shadow-2xl shadow-cyan-400/25 scale-105"
          : "hover:shadow-2xl hover:shadow-black/50"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        background: isSelected
          ? "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.9) 100%)",
      }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Popular badge */}
      {skip.popular && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            🔥 POPULAR
          </div>
        </div>
      )}

      {/* Eco badge */}
      {skip.eco && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            🌱 ECO
          </div>
        </div>
      )}

      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={skip.image} 
          alt={skip.size}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent animate-pulse" />
        )}
      </div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {skip.size}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">
              £{skip.price}
            </div>
            <div className="text-xs text-gray-400">{skip.hirePeriod} </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
          {skip.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Capacity:</span>
          <span className="text-white font-medium">{skip.capacity}</span>
        </div>

        {/* Animated selection indicator */}
        <div
          className={`mt-4 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ${
            isSelected ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
}

export default function HomePage() {

  const [selectedSkip, setSelectedSkip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSkips = skips.filter((skip) => {
    const matchesSearch =
      skip.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "popular" && skip.popular) ||
      (filterBy === "eco" && skip.eco);
    return matchesSearch && matchesFilter;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate()


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      {/* <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-2000" />
      </div> */}


      <div className="relative z-10 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}

          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              REMWaste Skip Hire
              <span className="block text-3xl sm:text-4xl mt-2 text-white/80">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Choose from our premium range of skip sizes. Professional service,
              competitive prices, same-day delivery available.
            </p>
            

            {/* Features row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 200 + 500}ms` }}
                >
                  <div className="text-cyan-400">{feature.icon}</div>
                  <span className="text-white text-sm font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Search and filter controls */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 delay-300 ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skip sizes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-gray-800">
                  All Skips
                </option>
                <option value="popular" className="bg-gray-800">
                  Popular
                </option>
                <option value="eco" className="bg-gray-800">
                  Eco-Friendly
                </option>
              </select>
            </div>
          </div>

          {/* Skip cards grid */}
          <div
            className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-500 ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {filteredSkips.map((skip, index) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                index={index}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={() =>
                  setSelectedSkip((current) =>
                    current?.id === skip.id ? null : skip
                  )
                }
              />
            ))}
          </div>

          {/* No results message */}
          {filteredSkips.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl text-white mb-2">No skips found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced bottom panel */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
          <div className="bg-black/90 backdrop-blur-xl border-t border-cyan-400/30 shadow-2xl">
            <div className="max-w-7xl mx-auto p-6">
              <p className="text-center text-xs text-gray-500 mb-4 italic">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification. All prices
                exclude VAT and permit fees where applicable.
              </p>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-white">
                        {selectedSkip.size}
                      </span>
                      {selectedSkip.popular && (
                        <span className="text-orange-400 text-sm">
                          🔥 Popular Choice
                        </span>
                      )}
                      {selectedSkip.eco && (
                        <span className="text-green-400 text-sm">
                          🌱 Eco-Friendly
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <span className="text-cyan-400 text-2xl font-bold">
                          £{selectedSkip.price}
                        </span>
                        <span className="text-gray-400">
                          for {selectedSkip.hirePeriod}
                        </span>
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>Capacity: {selectedSkip.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedSkip(null)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
                  >
                    Back
                  </button>
                  <button
                    className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                    onClick={() => navigate('/permit-check')}
                  >                    Continue to Booking
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
