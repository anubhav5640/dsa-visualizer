import { useState } from 'react'
import ComplexityBadge from '../components/ComplexityBadge'

const MAX_SIZE = 8

function StackPage() {
  const [stack, setStack] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [message, setMessage] = useState('Stack is empty. Push some elements!')
  const [lastAction, setLastAction] = useState(null)

  const push = () => {
    const val = inputVal.trim()
    if (!val) {
      setMessage('Please enter a value to push.')
      return
    }
    if (stack.length >= MAX_SIZE) {
      setMessage('Stack Overflow! Cannot push — stack is full.')
      setLastAction('overflow')
      return
    }
    const newItem = { id: Date.now(), value: val, isNew: true }
    setStack(prev => [...prev, newItem])
    setMessage(`Pushed "${val}" onto the stack.`)
    setLastAction('push')
    setInputVal('')
    setTimeout(() => {
      setStack(prev => prev.map(el => ({ ...el, isNew: false })))
    }, 400)
  }

  const pop = () => {
    if (stack.length === 0) {
      setMessage('Stack Underflow! Cannot pop — stack is empty.')
      setLastAction('underflow')
      return
    }
    const top = stack[stack.length - 1]
    setMessage(`Popped "${top.value}" from the stack.`)
    setLastAction('pop')
    setStack(prev => prev.slice(0, -1))
  }

  const peek = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty — nothing to peek.')
      return
    }
    setMessage(`Top element is "${stack[stack.length - 1].value}".`)
    setLastAction('peek')
  }

  const reset = () => {
    setStack([])
    setMessage('Stack cleared.')
    setLastAction(null)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') push()
  }

  const messageColor = {
    push: 'text-green-400',
    pop: 'text-red-400',
    peek: 'text-amber-400',
    overflow: 'text-red-500',
    underflow: 'text-red-500',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold mb-2 text-purple-400">Stack</h1>
        <p className="text-gray-400 text-sm mb-4">Last In First Out — LIFO</p>

        <ComplexityBadge time="O(1) push/pop" space="O(n)" />

        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter value..."
            maxLength={4}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm w-36 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={push}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Push
          </button>
          <button
            onClick={pop}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Pop
          </button>
          <button
            onClick={peek}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Peek
          </button>
          <button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className={`text-sm mb-6 font-medium ${messageColor[lastAction] || 'text-gray-400'}`}>
          {message}
        </div>

        <div className="flex gap-8 items-end">

          <div className="flex flex-col-reverse gap-2 min-h-[360px] justify-start">
            {stack.length === 0 ? (
              <div className="flex items-center justify-center w-48 h-16 border-2 border-dashed border-gray-700 rounded-xl text-gray-600 text-sm">
                Empty Stack
              </div>
            ) : (
              stack.map((item, index) => {
                const isTop = index === stack.length - 1
                return (
                  <div
                    key={item.id}
                    className={`w-48 py-3 px-4 rounded-xl border-2 flex items-center justify-between text-sm font-semibold transition-all duration-300
                      ${item.isNew ? 'scale-110' : 'scale-100'}
                      ${isTop
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-gray-800 border-gray-600 text-gray-200'
                      }`}
                  >
                    <span>{item.value}</span>
                    {isTop && (
                      <span className="text-xs bg-purple-800 text-purple-200 px-2 py-0.5 rounded-md">
                        TOP
                      </span>
                    )}
                  </div>
                )
              })
            )}
          </div>

          <div className="flex flex-col justify-between text-xs text-gray-500 min-h-[360px] pb-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <span>Size: {stack.length} / {MAX_SIZE}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Top pointer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-600" />
                <span>Stack items</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-purple-400">{stack.length}</div>
            <div className="text-xs text-gray-500 mt-1">Current size</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-gray-300">{MAX_SIZE - stack.length}</div>
            <div className="text-xs text-gray-500 mt-1">Remaining slots</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-amber-400">
              {stack.length > 0 ? stack[stack.length - 1].value : '—'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Top element</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StackPage