import { useState } from 'react'
import ArrayBar from '../components/ArrayBar'
import Controls from '../components/Controls'
import ComplexityBadge from '../components/ComplexityBadge'
import StepDisplay from '../components/StepDisplay'
import generateArray from '../utils/generateArray'
import bubbleSort from '../algorithms/bubbleSort'
import selectionSort from '../algorithms/selectionSort'
import insertionSort from '../algorithms/insertionSort'
import useAnimation from '../hooks/useAnimation'
import mergeSort from '../algorithms/mergeSort'
import quickSort from '../algorithms/quickSort'

const ALGORITHMS = {
  bubble:    { fn: bubbleSort,    label: 'Bubble Sort',    time: 'O(n²)',      space: 'O(1)' },
  selection: { fn: selectionSort, label: 'Selection Sort', time: 'O(n²)',      space: 'O(1)' },
  insertion: { fn: insertionSort, label: 'Insertion Sort', time: 'O(n²)',      space: 'O(1)' },
  merge:     { fn: mergeSort,     label: 'Merge Sort',     time: 'O(n log n)', space: 'O(n)' },
  quick:     { fn: quickSort,     label: 'Quick Sort',     time: 'O(n log n)', space: 'O(log n)' },
}

function SortingPage() {
  const [array, setArray] = useState(() => generateArray(40))
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState('bubble')
  const { isRunning, speed, setSpeed, pauseableSleep, start, pause, resume, stop, finish, isStopped } = useAnimation(50)

  const maxVal = Math.max(...array.map(bar => bar.value))
  const current = ALGORITHMS[selected]

  const handleGenerate = () => {
    if (isRunning) return
    setMessage('')
    setArray(generateArray(40))
  }

  const handleSort = async () => {
    if (isRunning) return
    start()
    await current.fn(array, setArray, setMessage, pauseableSleep, speed, isStopped)
    finish()
  }

  const handleReset = () => {
    stop()
    setMessage('')
    setArray(generateArray(40))
  }

  const handleAlgoChange = (algo) => {
    if (isRunning) return
    setSelected(algo)
    setMessage('')
    setArray(generateArray(40))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Sorting Algorithms</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(ALGORITHMS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleAlgoChange(key)}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed
              ${selected === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      <ComplexityBadge time={current.time} space={current.space} />

      <Controls
        isRunning={isRunning}
        onSort={handleSort}
        onPause={pause}
        onResume={resume}
        onReset={handleReset}
        onGenerate={handleGenerate}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      <div className="bg-gray-900 rounded-xl p-4 h-64 flex items-end gap-0.5">
        {array.map((bar) => (
          <div key={bar.id} className="flex-1 h-full">
            <ArrayBar value={bar.value} color={bar.color} maxVal={maxVal} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4 text-xs text-gray-400 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />Default</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" />Comparing</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />Swapping</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />Sorted</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-purple-500 inline-block" />Minimum</span>
      </div>

      <StepDisplay message={message} />
    </div>
  )
}

export default SortingPage