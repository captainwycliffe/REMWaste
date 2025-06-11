import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Camera, MapPin, Shield, Clock, AlertTriangle, CheckCircle, Upload, X, Info, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import StepProgress from '../components/StepProgress'
import { useLocation } from 'react-router-dom';

export default function PlacementPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
  const [permitInfo] = useState({ cost: 65, processingDays: 5 });
  const fileInputRef = useRef(null);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const navigate = useNavigate()
  const location = useLocation();
  const selectedSkip = location.state?.selectedSkip;
  console.log('Selected Skip:', selectedSkip);  

  const openModal = () => {
    if (!selectedOption) return;
    if (selectedOption === 'private') {
      navigate('/date');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadedPhoto(null);
    setIsDragging(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedPhoto(URL.createObjectURL(file));
    }
  };

  const placementOptions = [
    {
      id: 'private',
      title: 'Private Property',
      subtitle: 'Driveway, garden, or private land',
      icon: <Shield className="w-8 h-8" />,
      status: 'No permit required',
      statusColor: 'text-emerald-400',
      statusBg: 'bg-emerald-500/10',
      gradient: 'from-emerald-500/20 to-green-500/20',
      benefits: ['Immediate delivery available', 'No additional costs', 'Complete privacy'],
      description: 'Perfect for home renovations, garden clearance, or construction projects on your own property.'
    },
    {
      id: 'public',
      title: 'Public Road',
      subtitle: 'Council road or public property',
      icon: <MapPin className="w-8 h-8" />,
      status: 'Permit required',
      statusColor: 'text-amber-400',
      statusBg: 'bg-amber-500/10',
      gradient: 'from-amber-500/20 to-orange-500/20',
      benefits: ['We handle all paperwork', 'Professional placement', 'Fully compliant'],
      description: 'Ideal for properties without private access. We manage the entire permit process for you.'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M30 30l15-15v30l-15-15zm0 0l-15 15v-30l15 15z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" /> */}
        
        {/* Floating elements */}
        {/* <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-2000" /> */}
      </div>

      <div className="relative z-10 p-4 sm:p-10">
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StepProgress />
            
            <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              Where will the skip be placed?
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Choose your placement location to help us determine permit requirements and ensure smooth delivery.
            </p>
          </div>

         
          <div className={`grid gap-8 sm:grid-cols-2 mb-12 transition-all duration-1000 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {placementOptions.map((option, index) => (
              <div
                key={option.id}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  selectedOption === option.id
                    ? 'ring-2 ring-blue-400 shadow-2xl shadow-blue-400/25 scale-105'
                    : 'hover:shadow-2xl hover:shadow-black/50'
                }`}
                style={{ animationDelay: `${index * 200 + 500}ms` }}
                onClick={() => setSelectedOption(option.id)}
              >
            
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-50`} />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/95 backdrop-blur-sm" />
                

                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8">

                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${option.gradient} text-white`}>
                      {option.icon}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${option.statusBg} ${option.statusColor} border border-current/20`}>
                      {option.status}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {option.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">{option.subtitle}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{option.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {option.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`mt-6 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 ${
                    selectedOption === option.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {selectedOption === 'public' && (
            <div className={`space-y-6 mb-12 transition-all duration-500 ${selectedOption === 'public' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-500/20 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Permit Required</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        A council permit is mandatory for skip placement on public roads. We handle the entire application process.
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-amber-400 font-bold">£{permitInfo.cost} permit fee</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">Added to your booking</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Processing Time</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Council permits require {permitInfo.processingDays} working days to process. Plan your delivery accordingly.
                      </p>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Express processing available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Pro Tip</h3>
                    <p className="text-gray-300 text-sm">
                      We'll need a photo of your placement location to ensure proper positioning and identify any potential access issues. This helps us deliver efficiently and avoid any complications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={`flex justify-between items-center pt-8 transition-all duration-1000 delay-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 font-medium"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </button>
            
            <button
              className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform ${
                selectedOption
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              onClick={openModal}
              disabled={!selectedOption}
            >
              Continue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
            <div className="p-8">
            
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl">
                    <Camera className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Skip Placement Photo</h2>
                    <p className="text-gray-400 text-sm">Required for public road placement</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-blue-400 font-medium mb-1">Why do we need this?</p>
                    <p className="text-gray-300 leading-relaxed">
                      A clear photo helps us ensure proper skip placement, identify potential access issues, and comply with council requirements for road permits.
                    </p>
                  </div>
                </div>
              </div>


              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-400 bg-blue-400/10'
                    : uploadedPhoto
                    ? 'border-emerald-400 bg-emerald-400/5'
                    : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedPhoto ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedPhoto} 
                      alt="Uploaded placement location" 
                      className="mx-auto rounded-xl max-h-64 object-contain shadow-lg" 
                    />
                    <div className="flex items-center justify-center gap-2 text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Photo uploaded successfully</span>
                    </div>
                    <p className="text-gray-400 text-sm">Click to change photo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">
                        {isDragging ? 'Drop your photo here' : 'Upload placement photo'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Drag & drop or click to select • JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </div>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-400" />
                  Photo Tips
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Show the full area where the skip will be placed</li>
                  <li>• Include nearby landmarks or house numbers if visible</li>
                  <li>• Take photo during daylight for best clarity</li>
                  <li>• Ensure the road surface and width are clearly visible</li>
                </ul>
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
                <button
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 font-medium"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform ${
                    uploadedPhoto
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white hover:shadow-xl hover:scale-105'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    closeModal();
                    navigate('/date', { state: { selectedSkip } });
                  }}
                  disabled={!uploadedPhoto}
                >
                  Continue to Date Selection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
