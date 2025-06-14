import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, Shield, Check, Star, Sparkles, ChevronLeft, Info, Calendar, Truck, Recycle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import StepProgress from '../components/StepProgress'
import { useLocation } from 'react-router-dom';

export default function PremiumPaymentSystem( ) {
  // Default skip data if none provided (for demo purposes)
  const defaultSkip = {
    id: 2,
    size: "5 Yard Skip",
    price: 241,
    hirePeriod: "7 days",
    capacity: "50-60 bags",
    image: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
    popular: true,
    eco: true,
    description: "Most popular choice for renovations",
  };

  const location = useLocation();
  const selectedSkipData = location.state?.selectedSkip;
  console.log('Selected Skip Data:', selectedSkipData);

  const skipData = selectedSkipData || defaultSkip;
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    city: '',
    postcode: '',
    county: ''
  });
  const [saveCard, setSaveCard] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const VAT_RATE = 0.20; // UK VAT rate 20%
  const subtotal = skipData.price;
  const vatAmount = subtotal * VAT_RATE;
  const total = subtotal + vatAmount;

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const navigate = useNavigate()

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + ' / ' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    return 'unknown';
  };

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setProcessing(false);
    alert(`Payment successful! Charged £${total.toFixed(2)} for ${skipData.size} hire`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 sm:bottom-40 left-1/4 w-20 sm:w-40 h-20 sm:h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-10 sm:bottom-20 right-1/3 w-14 sm:w-28 h-14 sm:h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-3000" />
      </div>

      <div className="relative z-10 p-3 sm:p-4 lg:p-8">
        <StepProgress />
        <div className="max-w-7xl mx-auto">
          
          <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              Complete Your Booking
            </h1>
            <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Secure payment for your skip hire with instant confirmation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
  
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              

              <div className="relative overflow-hidden rounded-2xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">

              <div className="relative h-32 sm:h-40 lg:h-48">
                  <img 
                    src={skipData.image} 
                    alt={skipData.size}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
  
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-wrap gap-2 justify-between">
                  {skipData.eco && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                        🌱 ECO-FRIENDLY
                      </div>
                    )}
                    {skipData.popular && (
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg animate-pulse">
                        🔥 POPULAR
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-0">
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{skipData.size}</h2>
                      <p className="text-gray-300 text-xs sm:text-sm">{skipData.description}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-cyan-400">£{skipData.price}</div>
                      <div className="text-xs text-gray-400">{skipData.hirePeriod}</div>
                    </div>
                  </div>

            
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                                      <div className="text-center">
                                        <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400 mx-auto mb-1" />
                                        <div className="text-xs text-gray-400">Hire Period</div>
                                        <div className="text-xs sm:text-sm font-medium text-white">{skipData.hirePeriod}</div>
                                      </div>
                                      <div className="text-center">
                                        <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400 mx-auto mb-1" />
                                        <div className="text-xs text-gray-400">Capacity</div>
                                        <div className="text-xs sm:text-sm font-medium text-white">{skipData.capacity}</div>
                                      </div>
                                      <div className="text-center">
                                        <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400 mx-auto mb-1" />
                                        <div className="text-xs text-gray-400">Service</div>
                                        <div className="text-xs sm:text-sm font-medium text-white">Insured</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
                              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Info className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                                Payment Summary
                              </h3>
                              <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm sm:text-base text-gray-300">{skipData.size} Hire</span>
                                  <span className="text-sm sm:text-base text-white font-medium">£{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm sm:text-base text-gray-300">UK VAT (20%)</span>
                                  <span className="text-sm sm:text-base text-white font-medium">£{vatAmount.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 sm:pt-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-white text-lg sm:text-xl font-bold">Total Amount</span>
                                    <span className="text-cyan-400 text-xl sm:text-2xl font-bold">£{total.toFixed(2)}</span>
                                  </div>
                                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                                    💳 Secure payment • 🇬🇧 VAT included • 🛡️ Fully insured service
                                  </p>
                                </div>
                              </div>
                            </div>

    
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
                              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">What's Included</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                {[
                                  { icon: Truck, text: "Same Day Delivery" },
                                  { icon: Shield, text: "Fully Insured" },
                                  { icon: Recycle, text: "Eco Disposal" },
                                  { icon: Star, text: "5★ Service" }
                                ].map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                                    <feature.icon className="w-3 sm:w-4 h-3 sm:h-4 text-cyan-400 flex-shrink-0" />
                                    <span className="text-gray-300">{feature.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

            <div className={`transition-all duration-1000 delay-400 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Payment Details</h2>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">256-bit SSL Encryption</span>
                    </div>
                  </div>
                </div>

                 <div className="space-y-4 sm:space-y-6">
                                  
                                  {/* Card Number */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                      />
                                      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
                                        <div className={`w-6 sm:w-8 h-4 sm:h-5 rounded bg-blue-600 flex items-center justify-center text-xs text-white font-bold transition-opacity ${getCardType(cardNumber) === 'visa' ? 'opacity-100' : 'opacity-30'}`}>
                                          VISA
                                        </div>
                                        <div className={`w-6 sm:w-8 h-4 sm:h-5 rounded bg-red-600 flex items-center justify-center transition-opacity ${getCardType(cardNumber) === 'mastercard' ? 'opacity-100' : 'opacity-30'}`}>
                                          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                
                                  {/* Cardholder Name */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                                    <input
                                      type="text"
                                      value={holderName}
                                      onChange={(e) => setHolderName(e.target.value)}
                                      placeholder="John Smith"
                                      className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                    />
                                  </div>
                
                                  {/* Expiry & CVC */}
                                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                                      <input
                                        type="text"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                                        placeholder="MM / YY"
                                        maxLength="7"
                                        className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                                      <input
                                        type="text"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        placeholder="123"
                                        className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                      />
                                    </div>
                                  </div>
                
                                  {/* Billing Address */}
                                  <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                                      🇬🇧 UK Billing Address
                                    </h3>
                                    <input
                                      type="text"
                                      value={billingAddress.line1}
                                      onChange={(e) => setBillingAddress({...billingAddress, line1: e.target.value})}
                                      placeholder="123 Main Street"
                                      className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                    />
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                      <input
                                        type="text"
                                        value={billingAddress.city}
                                        onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                                        placeholder="London"
                                        className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                      />
                                      <input
                                        type="text"
                                        value={billingAddress.postcode}
                                        onChange={(e) => setBillingAddress({...billingAddress, postcode: e.target.value})}
                                        placeholder="SW1A 1AA"
                                        className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      value={billingAddress.county}
                                      onChange={(e) => setBillingAddress({...billingAddress, county: e.target.value})}
                                      placeholder="Greater London (Optional)"
                                      className="w-full p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm sm:text-base"
                                    />
                                  </div>
                
                                  {/* Save Card Checkbox */}
                                  <div className="flex items-start gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                                    <input
                                      type="checkbox"
                                      id="saveCard"
                                      checked={saveCard}
                                      onChange={(e) => setSaveCard(e.target.checked)}
                                      className="w-4 sm:w-5 h-4 sm:h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-cyan-500 checked:border-cyan-500 focus:ring-cyan-400 mt-0.5"
                                    />
                                    <label htmlFor="saveCard" className="text-gray-300 cursor-pointer flex-1 text-sm sm:text-base leading-relaxed">
                                      Save this card for future skip hire bookings
                                    </label>
                                  </div>
                
                                  {/* Action Buttons */}
                                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                    <button
                                      type="button"
                                      className="w-full sm:flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                                      onClick={() => navigate(-1)} 
                                    >
                                      <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                                      Back
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handlePayment}
                                      disabled={processing}
                                      className={`w-full sm:flex-2 py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                                        processing
                                          ? 'bg-gray-600 cursor-not-allowed'
                                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105'
                                      } text-white`}
                                    >
                                      {processing ? (
                                        <>
                                          <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                          <span className="hidden sm:inline">Processing...</span>
                                          <span className="sm:hidden">Processing</span>
                                        </>
                                      ) : (
                                        <>
                                          <Lock className="w-4 sm:w-5 h-4 sm:h-5" />
                                          <span className="hidden sm:inline">Complete Payment £{total.toFixed(2)}</span>
                                          <span className="sm:hidden">Pay £{total.toFixed(2)}</span>
                                          <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </>
                                      )}
                                    </button>
                                  </div>
                
                                  {/* Security Footer */}
                                  <div className="text-center text-gray-400 text-xs sm:text-sm pt-4 border-t border-white/10">
                                    <p className="flex items-center justify-center gap-2 mb-2">
                                      🔒 Your payment is secured with bank-level encryption
                                    </p>
                                    <p className="text-xs">
                                      🇬🇧 REMWaste UK Ltd • VAT Reg: GB123456789 • Company No: 12345678
                                    </p>
                                  </div>
                                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}