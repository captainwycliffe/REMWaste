import React from 'react';

export default function PaymentDetails () {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl text- max-w-md">
      <h2 className="text-lg font-semibold mb-4">Payment Details</h2>

      <label className="block text-sm mb-1">Card number</label>
      <div className="relative">
        <input
          type="text"
          placeholder="1234 1234 1234 1234"
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
          <img src="/visa-icon.png" className="w-6" alt="Visa" />
          <img src="/mc-icon.png" className="w-6" alt="MasterCard" />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Expiration date</label>
          <input
            type="text"
            placeholder="MM / YY"
            className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Security code</label>
          <input
            type="text"
            placeholder="CVC"
            className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white"
          />
        </div>
      </div>

      <label className="block text-sm mt-4 mb-1">Country</label>
      <select className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white">
        <option>Kenya</option>
        <option>United States</option>
        <option>United Kingdom</option>
      </select>

      <div className="flex items-center mt-4">
        <input type="checkbox" className="mr-2" />
        <label className="text-sm">Save this card as default payment method</label>
      </div>

      <div className="mt-6 space-y-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded">
          Complete Payment
        </button>
        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded">
          Back
        </button>
      </div>
    </div>
  );
};

