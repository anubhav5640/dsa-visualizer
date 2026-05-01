function StepDisplay({ message }) {
  return (
    <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 min-h-[48px]">
      <p className="text-sm text-gray-300">
        {message || 'Press Sort to begin...'}
      </p>
    </div>
  )
}

export default StepDisplay