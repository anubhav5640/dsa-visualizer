import { useState } from 'react'
import ArrayBar from '../components/ArrayBar'
import Controls from '../components/Controls'
import ComplexityBadge from '../components/ComplexityBadge'
import StepDisplay from '../components/StepDisplay'
import PseudocodePanel from '../components/PseudocodePanel'
import generateArray from '../utils/generateArray'
import bubbleSort from '../algorithms/bubbleSort'
import selectionSort from '../algorithms/selectionSort'
import insertionSort from '../algorithms/insertionSort'
import mergeSort from '../algorithms/mergeSort'
import quickSort from '../algorithms/quickSort'
import useAnimation from '../hooks/useAnimation'

const ALGORITHMS = {
  bubble:    { fn: bubbleSort,    label: 'Bubble',    time: 'O(n²)',      space: 'O(1)' },
  selection: { fn: selectionSort, label: 'Selection', time: 'O(n²)',      space: 'O(1)' },
  insertion: { fn: insertionSort, label: 'Insertion', time: 'O(n²)',      space: 'O(1)' },
  merge:     { fn: mergeSort,     label: 'Merge',     time: 'O(n log n)', space: 'O(n)' },
  quick:     { fn: quickSort,     label: 'Quick',     time: 'O(n log n)', space: 'O(log n)' },
}

function SortingPage() {
  const [array, setArray] = useState(() => generateArray(30))
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState('bubble')
  const [currentLine, setCurrentLine] = useState(-1)
  const [showCode, setShowCode] = useState(true)
  const { isRunning, speed, setSpeed, pauseableSleep, start, pause, resume, stop, finish, isStopped } = useAnimation(50)

  const maxVal = Math.max(...array.map(bar => bar.value))
  const current = ALGORITHMS[selected]

  const handleGenerate = () => {
    if (isRunning) return
    setMessage('')
    setCurrentLine(-1)
    setArray(generateArray(30))
  }

  const handleSort = async () => {
    if (isRunning) return
    start()
    await current.fn(array, setArray, setMessage, pauseableSleep, speed, isStopped, setCurrentLine)
    setCurrentLine(-1)
    finish()
  }

  const handleReset = () => {
    stop()
    setMessage('')
    setCurrentLine(-1)
    setArray(generateArray(30))
  }

  const handleAlgoChange = (algo) => {
    if (isRunning) return
    setSelected(algo)
    setMessage('')
    setCurrentLine(-1)
    setArray(generateArray(30))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-blue-400">Sorting Algorithms</h1>
        <button
          onClick={() => setShowCode(prev => !prev)}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {Object.entries(ALGORITHMS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleAlgoChange(key)}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:cursor-not-allowed
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

      <div className={`flex gap-4 ${showCode ? 'flex-col lg:flex-row' : ''}`}>
        <div className="flex-1">
          <div className="bg-gray-900 rounded-xl p-3 md:p-4 h-48 md:h-64 flex items-end gap-px">
            {array.map((bar) => (
              <div key={bar.id} className="flex-1 h-full">
                <ArrayBar value={bar.value} color={bar.color} maxVal={maxVal} />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-3 text-xs text-gray-400 flex-wrap">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />Default</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" />Comparing</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />Swapping</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />Sorted</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-purple-500 inline-block" />Pivot/Min</span>
          </div>

          <StepDisplay message={message} />
        </div>

        {showCode && (
          <div className="lg:w-72">
            <PseudocodePanel algorithm={selected} currentLine={currentLine} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SortingPage