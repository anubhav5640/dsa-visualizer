function Controls({ isRunning, onSort, onPause, onResume, onReset, onGenerate, speed, onSpeedChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <button
        onClick={onGenerate}
        disabled={isRunning}
        className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        New Array
      </button>

      <button
        onClick={onSort}
        disabled={isRunning}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Sort
      </button>

      <button
        onClick={onPause}
        disabled={!isRunning}
        className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Pause
      </button>

      <button
        onClick={onResume}
        disabled={!isRunning}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Resume
      </button>

      <button
        onClick={onReset}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Reset
      </button>

      <div className="flex items-center gap-3 ml-2">
        <span className="text-sm text-gray-400">Fast</span>
        <input
          type="range"
          min="10"
          max="300"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-28"
        />
        <span className="text-sm text-gray-400">Slow</span>
      </div>
    </div>
  )
}

export default Controls