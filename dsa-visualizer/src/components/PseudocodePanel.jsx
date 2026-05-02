import pseudocode from '../utils/pseudocode'

function PseudocodePanel({ algorithm, currentLine }) {
  const lines = pseudocode[algorithm] || []

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Pseudocode</p>
        <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded font-mono">
          {algorithm}
        </span>
      </div>

      <div className="space-y-1 font-mono text-xs">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200
              ${currentLine === index
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            <span className="text-gray-600 mr-3 select-none">{index + 1}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PseudocodePanel