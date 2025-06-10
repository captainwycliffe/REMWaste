import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  MapPin,
  Trash2,
  Truck,
  ShieldCheck,
  Calendar,
  CreditCard,
} from "lucide-react";

const steps = [
  { icon: <MapPin size={18} />, label: "Postcode", path: "/" },
  { icon: <Trash2 size={18} />, label: "Waste Type", path: "/" },
  { icon: <Truck size={18} />, label: "Select Skip", path: "/" },
  { icon: <ShieldCheck size={18} />, label: "Permit Check", path: "/permit-check" },
  { icon: <Calendar size={18} />, label: "Choose Date", path: "/date" },
  { icon: <CreditCard size={18} />, label: "Payment", path: "/payment" },
];

export default function StepProgress() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex justify-center gap-6 sm:gap-10 text-sm text-white mb-10">
      {steps.map(({ icon, label, path }, idx) => (
        <div
          key={idx}
          className={`flex items-center space-x-2 ${idx < steps.length - 1 && "relative"}`}
        >
          <span className={`${
            currentPath.startsWith(path) ? "text-blue-500" : "text-gray-500"
          }`}>
            {icon}
          </span>
          <span className={`${
            currentPath.startsWith(path) ? "text-white" : "text-gray-500"
          }`}>
            {label}
          </span>
          {idx < steps.length - 1 && (
            <div
              className={`${
                currentPath.startsWith(steps[idx + 1].path)
                  ? "w-5 h-px bg-blue-500 sm:w-10 mx-2"
                  : "w-5 h-px bg-gray-600 sm:w-10 mx-2 hidden sm:block"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}