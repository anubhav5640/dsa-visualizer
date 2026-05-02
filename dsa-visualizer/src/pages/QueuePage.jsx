import { useState } from 'react'
import ComplexityBadge from '../components/ComplexityBadge'

const MAX_SIZE = 7

function QueuePage() {
  const [queue, setQueue] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [message, setMessage] = useState('Queue is empty. Enqueue some elements!')
  const [lastAction, setLastAction] = useState(null)

  const enqueue = () => {
    const val = inputVal.trim()
    if (!val) {
      setMessage('Please enter a value to enqueue.')
      return
    }
    if (queue.length >= MAX_SIZE) {
      setMessage('Queue is full! Cannot enqueue.')
      setLastAction('overflow')
      return
    }
    const newItem = { id: Date.now(), value: val, isNew: true }
    setQueue(prev => [...prev, newItem])
    setMessage(`Enqueued "${val}" at the rear.`)
    setLastAction('enqueue')
    setInputVal('')
    setTimeout(() => {
      setQueue(prev => prev.map(el => ({ ...el, isNew: false })))
    }, 400)
  }

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty! Cannot dequeue.')
      setLastAction('underflow')
      return
    }
    const front = queue[0]
    setMessage(`Dequeued "${front.value}" from the front.`)
    setLastAction('dequeue')
    setQueue(prev => prev.slice(1))
  }

  const reset = () => {
    setQueue([])
    setMessage('Queue cleared.')
    setLastAction(null)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') enqueue()
  }

  const messageColor = {
    enqueue: 'text-green-400',
    dequeue: 'text-red-400',
    overflow: 'text-red-500',
    underflow: 'text-red-500',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold mb-2 text-green-400">Queue</h1>
        <p className="text-gray-400 text-sm mb-4">First In First Out — FIFO</p>

        <ComplexityBadge time="O(1) enqueue/dequeue" space="O(n)" />

        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter value..."
            maxLength={4}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm w-36 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={enqueue}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Enqueue
          </button>
          <button
            onClick={dequeue}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Dequeue
          </button>
          <button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className={`text-sm mb-8 font-medium ${messageColor[lastAction] || 'text-gray-400'}`}>
          {message}
        </div>

        <div className="relative">

          <div className="flex gap-3 items-center min-h-[100px]">
            {queue.length === 0 ? (
              <div className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-700 rounded-xl text-gray-600 text-sm">
                Empty Queue
              </div>
            ) : (
              queue.map((item, index) => {
                const isFront = index === 0
                const isRear = index === queue.length - 1
                return (
                  <div key={item.id} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${item.isNew ? 'scale-110' : 'scale-100'}
                        ${isFront
                          ? 'bg-red-900 border-red-400 text-red-200'
                          : isRear
                          ? 'bg-green-900 border-green-400 text-green-200'
                          : 'bg-gray-800 border-gray-600 text-gray-200'
                        }`}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs text-center">
                      {isFront && <span className="text-red-400 font-medium">FRONT</span>}
                      {isRear && !isFront && <span className="text-green-400 font-medium">REAR</span>}
                      {isFront && isRear && <span className="text-yellow-400 font-medium"> / REAR</span>}
                      {!isFront && !isRear && <span className="text-gray-600">—</span>}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {queue.length > 1 && (
            <div className="flex gap-3 mt-1 pl-8">
              {queue.map((_, index) => (
                index < queue.length - 1 && (
                  <div key={index} className="flex items-center" style={{ width: '64px' }}>
                    <div className="flex-1 h-px bg-gray-600" />
                    <span className="text-gray-600 text-xs">→</span>
                  </div>
                )
              ))}
            </div>
          )}

        </div>

        <div className="mt-8 flex items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-900 border border-red-400 inline-block" />
            Front — next to dequeue
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-900 border border-green-400 inline-block" />
            Rear — last enqueued
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gray-800 border border-gray-600 inline-block" />
            Middle elements
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-green-400">{queue.length}</div>
            <div className="text-xs text-gray-500 mt-1">Current size</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-red-400">
              {queue.length > 0 ? queue[0].value : '—'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Front</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-green-400">
              {queue.length > 0 ? queue[queue.length - 1].value : '—'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Rear</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default QueuePage