export default function SkipCard({ size, price, hirePeriod, roadNote, imageUrl, onSelect, isSelected }) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 border-2 ${
          isSelected ? 'border-blue-600' : 'border-transparent'
        }`}
      >
        <img src={imageUrl} alt={size} className="w-full h-40 object-cover" />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold">{size}</h2>
            <p className="text-sm text-gray-500">{hirePeriod}</p>
            {roadNote && (
              <p className="text-xs mt-2 text-red-600 font-semibold">{roadNote}</p>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-blue-600 font-bold text-xl">£{price}</span>
            <button
              onClick={onSelect}
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Select This Skip →
            </button>
          </div>
        </div>
      </div>
    );
  }
  