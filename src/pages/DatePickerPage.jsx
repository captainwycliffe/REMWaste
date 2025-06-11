import React, { useState, useEffect } from "react";
import {
  Calendar,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Shield,
  Star,
} from "lucide-react";

import { useNavigate } from 'react-router-dom'
import StepProgress from '../components/StepProgress'


export default function PremiumDeliveryScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("morning");
  const [calendarMode, setCalendarMode] = useState("month"); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [collectionDate, setCollectionDate] = useState(null);


  useEffect(() => {
    if (selectedDate) {
      const newCollectionDate = new Date(selectedDate);
      newCollectionDate.setDate(selectedDate.getDate() + 7);
      setCollectionDate(newCollectionDate);
    }
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigate = useNavigate()

//   const formatShortDate = (date) => {
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });
//   };

  const isDateAvailable = (date) => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 5); 

    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const isPast = date < minDate;

    return !isWeekend && !isPast;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day);
      days.push({ date, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      days.push({ date, isCurrentMonth: true });
    }


    const totalCells = 42; 
    const remainingCells = totalCells - days.length;
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + direction);
      setCurrentDate(newDate);
      setIsAnimating(false);
    }, 150);
  };

  const navigateYear = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(currentDate.getFullYear() + direction);
      setCurrentDate(newDate);
      setIsAnimating(false);
    }, 150);
  };

  const handleDateSelect = (date) => {
    if (!isDateAvailable(date)) return;

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedDate(date);
      setIsAnimating(false);
    }, 150);
  };

  const timeSlots = [
    {
      id: "morning",
      label: "Morning Delivery",
      time: "7:00 AM - 12:00 PM",
      icon: "🌅",
      description: "Perfect for early starts",
      premium: false,
    },
    {
      id: "afternoon",
      label: "Afternoon Service",
      time: "12:00 PM - 6:00 PM",
      icon: "☀️",
      description: "Standard delivery window",
      premium: false,
    },
    {
      id: "express",
      label: "Express Delivery",
      time: "2-hour window",
      icon: "⚡",
      description: "Premium same-day service",
      premium: true,
    },
    {
      id: "flexible",
      label: "Flexible Timing",
      time: "7:00 AM - 6:00 PM",
      icon: "🕐",
      description: "Any time that works",
      premium: false,
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>


        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      </div>
          <div className="mt-8">
            <StepProgress />
          </div>

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        <div className="text-center mb-12 backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              <Star className="w-4 h-4" />
              <span>Premium Service</span>
            </div>
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl">
            <Truck className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Elite Delivery Scheduling
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience our premium skip delivery service with precision timing,
            professional handling, and complete peace of mind.
          </p>
        </div>


        <div className="mb-8 backdrop-blur-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-400/20 shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-amber-500/20 rounded-lg p-2">
              <AlertCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-100 mb-2 text-lg">
                Council Permit Processing
              </h3>
              <p className="text-amber-200/90 leading-relaxed">
                Skip placement on public roads requires council approval with a
                5 working day processing period.
                <span className="font-medium text-amber-100 block mt-1">
                  📅 Earliest available delivery:{" "}
                  {new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
         
          <div className="xl:col-span-2 backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="w-7 h-7 text-blue-400" />
                <h2 className="text-lg lg:text-3xl font-bold">Select Your Date</h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCalendarMode(calendarMode === "month" ? "year" : "month")
                  }
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-medium border border-white/20"
                >
                  {calendarMode === "month" ? "Year View" : "Month View"}
                </button>
              </div>
            </div>

           
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() =>
                  calendarMode === "month"
                    ? navigateMonth(-1)
                    : navigateYear(-1)
                }
                className="p-3 hover:bg-white/10 rounded-xl transition-all duration-300 group border border-white/10"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-bold">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  {calendarMode === "month"
                    ? "Select your preferred delivery date"
                    : "Navigate by year"}
                </p>
              </div>

              <button
                onClick={() =>
                  calendarMode === "month" ? navigateMonth(1) : navigateYear(1)
                }
                className="p-3 hover:bg-white/10 rounded-xl transition-all duration-300 group border border-white/10"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

           
            <div
              className={`transition-all duration-300 ${
                isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-slate-400 p-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

        
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((dayObj, index) => {
                  const { date, isCurrentMonth } = dayObj;
                  const isSelected =
                    selectedDate &&
                    selectedDate.toDateString() === date.toDateString();
                  const isAvailable = isDateAvailable(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      disabled={!isAvailable || !isCurrentMonth}
                      className={`
                        relative p-3 rounded-xl transition-all duration-300 transform hover:scale-105 min-h-[3rem] flex items-center justify-center
                        ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border-2 border-blue-400"
                            : isToday && isCurrentMonth
                            ? "bg-white/10 border-2 border-blue-400/50 text-blue-300"
                            : isAvailable && isCurrentMonth
                            ? "bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-blue-300/50"
                            : "bg-transparent text-slate-600 cursor-not-allowed"
                        }
                        ${!isCurrentMonth ? "opacity-30" : ""}
                      `}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{date.getDate()}</div>
                        {isToday && isCurrentMonth && (
                          <div className="text-xs text-blue-300 mt-1">
                            Today
                          </div>
                        )}
                      </div>

                      {isSelected && (
                        <div className="absolute -top-1 -right-1">
                          <CheckCircle className="w-5 h-5 text-emerald-400 bg-white rounded-full" />
                        </div>
                      )}

                      {isAvailable &&
                        isCurrentMonth &&
                        !isSelected &&
                        hoveredDate?.toDateString() === date.toDateString() && (
                          <div className="absolute inset-0 bg-blue-500/20 rounded-xl border border-blue-400/30"></div>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>

        
            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="font-semibold mb-4 text-slate-300">
                Quick Select
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Next Week", days: 7 },
                  { label: "In 2 Weeks", days: 14 },
                  { label: "Next Month", days: 30 },
                  { label: "In 2 Months", days: 60 },
                ].map((option) => {
                  const quickDate = new Date();
                  quickDate.setDate(quickDate.getDate() + option.days);

                  return (
                    <button
                      key={option.label}
                      onClick={() => {
                        setCurrentDate(
                          new Date(
                            quickDate.getFullYear(),
                            quickDate.getMonth(),
                            1
                          )
                        );
                        handleDateSelect(quickDate);
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-blue-500/20 rounded-lg transition-all duration-300 text-sm font-medium border border-white/20 hover:border-blue-400/50"
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="space-y-6">

            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-semibold">Delivery Window</h3>
              </div>

              <div className="space-y-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedTime(slot.id)}
                    className={`
                      w-full p-5 rounded-xl text-left transition-all duration-300 hover:scale-102 relative
                      ${
                        selectedTime === slot.id
                          ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/50 shadow-lg"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-300/50"
                      }
                    `}
                  >
                    {slot.premium && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                        PREMIUM
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{slot.icon}</span>
                        <div>
                          <div className="font-semibold text-lg">
                            {slot.label}
                          </div>
                          <div className="text-sm text-slate-400 mb-1">
                            {slot.time}
                          </div>
                          <div className="text-xs text-slate-500">
                            {slot.description}
                          </div>
                        </div>
                      </div>
                      {selectedTime === slot.id && (
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>


            {selectedDate && (
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl mr-3 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  Booking Summary
                </h3>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <Truck className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-blue-300">
                        DELIVERY
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">
                      {formatDate(selectedDate)}
                    </div>
                    <div className="text-sm text-slate-300">
                      {timeSlots.find((slot) => slot.id === selectedTime)?.time}
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <div className="flex items-center space-x-3 text-sm text-slate-400">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-500"></div>
                      <span className="font-medium">7 DAYS RENTAL</span>
                      <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                    </div>
                  </div>

                  {collectionDate && (
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 text-orange-400 mr-2" />
                        <span className="text-sm font-medium text-orange-300">
                          COLLECTION
                        </span>
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {formatDate(collectionDate)}
                      </div>
                      <div className="text-sm text-slate-300">
                        Ensure skip accessibility
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

           
            <div className="flex space-x-4">
              <button onClick={() => navigate(-1)} className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center justify-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back
              </button>
              <button
                disabled={!selectedDate}
                className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center group ${
                  selectedDate
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-blue-500/25"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
              >
                {selectedDate ? "Continue to Payment" : "Select Date First"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

    
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Truck className="w-8 h-8" />,
              title: "Premium Fleet",
              desc: "Modern, well-maintained vehicles with professional drivers",
              gradient: "from-blue-500/20 to-cyan-500/20",
              border: "border-blue-500/30",
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Precision Timing",
              desc: "GPS tracking and real-time updates for exact delivery windows",
              gradient: "from-emerald-500/20 to-teal-500/20",
              border: "border-emerald-500/30",
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Full Protection",
              desc: "Comprehensive insurance coverage and damage guarantee",
              gradient: "from-orange-500/20 to-amber-500/20",
              border: "border-orange-500/30",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`backdrop-blur-xl bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 border ${feature.border} hover:scale-105 transition-all duration-300 group cursor-pointer`}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
