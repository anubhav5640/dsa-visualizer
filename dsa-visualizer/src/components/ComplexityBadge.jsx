function ComplexityBadge({ time, space }) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5">
        <span className="text-gray-400 text-xs">Time</span>
        <span className="text-yellow-400 text-xs font-mono font-semibold">{time}</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5">
        <span className="text-gray-400 text-xs">Space</span>
        <span className="text-blue-400 text-xs font-mono font-semibold">{space}</span>
      </div>
    </div>
  )
}

export default ComplexityBadge