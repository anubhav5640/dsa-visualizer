import { useState } from 'react'
import ComplexityBadge from '../components/ComplexityBadge'

function LinkedListPage() {
  const [list, setList] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [indexVal, setIndexVal] = useState('')
  const [message, setMessage] = useState('Linked list is empty. Insert some nodes!')
  const [lastAction, setLastAction] = useState(null)
  const [highlightIndex, setHighlightIndex] = useState(null)

  const insertAtHead = () => {
    const val = inputVal.trim()
    if (!val) { setMessage('Enter a value first.'); return }
    const newNode = { id: Date.now(), value: val, isNew: true }
    setList(prev => [newNode, ...prev])
    setMessage(`Inserted "${val}" at head. O(1) operation.`)
    setLastAction('insert')
    setInputVal('')
    setHighlightIndex(0)
    setTimeout(() => {
      setList(prev => prev.map(n => ({ ...n, isNew: false })))
      setHighlightIndex(null)
    }, 600)
  }

  const insertAtTail = () => {
    const val = inputVal.trim()
    if (!val) { setMessage('Enter a value first.'); return }
    const newNode = { id: Date.now(), value: val, isNew: true }
    setList(prev => [...prev, newNode])
    setMessage(`Inserted "${val}" at tail. O(n) operation — traversed ${list.length} nodes.`)
    setLastAction('insert')
    setInputVal('')
    setHighlightIndex(list.length)
    setTimeout(() => {
      setList(prev => prev.map(n => ({ ...n, isNew: false })))
      setHighlightIndex(null)
    }, 600)
  }

  const insertAtIndex = () => {
    const val = inputVal.trim()
    const idx = parseInt(indexVal)
    if (!val) { setMessage('Enter a value first.'); return }
    if (isNaN(idx) || idx < 0 || idx > list.length) {
      setMessage(`Invalid index. Valid range: 0 to ${list.length}`)
      return
    }
    const newNode = { id: Date.now(), value: val, isNew: true }
    setList(prev => {
      const copy = [...prev]
      copy.splice(idx, 0, newNode)
      return copy
    })
    setMessage(`Inserted "${val}" at index ${idx}. Traversed ${idx} nodes.`)
    setLastAction('insert')
    setInputVal('')
    setIndexVal('')
    setHighlightIndex(idx)
    setTimeout(() => {
      setList(prev => prev.map(n => ({ ...n, isNew: false })))
      setHighlightIndex(null)
    }, 600)
  }

  const deleteAtHead = () => {
    if (list.length === 0) { setMessage('List is empty!'); return }
    const val = list[0].value
    setList(prev => prev.slice(1))
    setMessage(`Deleted head node "${val}". O(1) operation.`)
    setLastAction('delete')
  }

  const deleteAtTail = () => {
    if (list.length === 0) { setMessage('List is empty!'); return }
    const val = list[list.length - 1].value
    setList(prev => prev.slice(0, -1))
    setMessage(`Deleted tail node "${val}". O(n) operation.`)
    setLastAction('delete')
  }

  const deleteAtIndex = () => {
    const idx = parseInt(indexVal)
    if (isNaN(idx) || idx < 0 || idx >= list.length) {
      setMessage(`Invalid index. Valid range: 0 to ${list.length - 1}`)
      return
    }
    const val = list[idx].value
    setList(prev => prev.filter((_, i) => i !== idx))
    setMessage(`Deleted node "${val}" at index ${idx}.`)
    setLastAction('delete')
    setIndexVal('')
  }

  const reset = () => {
    setList([])
    setMessage('List cleared.')
    setLastAction(null)
    setHighlightIndex(null)
  }

  const messageColor = {
    insert: 'text-green-400',
    delete: 'text-red-400',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-2 text-orange-400">Linked List</h1>
        <p className="text-gray-400 text-sm mb-4">Singly Linked List — nodes connected by pointers</p>

        <ComplexityBadge time="O(1) head  O(n) tail" space="O(n)" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Insert Node</p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Value"
                maxLength={4}
                className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm w-24 focus:outline-none focus:border-orange-500"
              />
              <input
                type="number"
                value={indexVal}
                onChange={(e) => setIndexVal(e.target.value)}
                placeholder="Index"
                className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm w-20 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={insertAtHead} className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Insert Head
              </button>
              <button onClick={insertAtTail} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Insert Tail
              </button>
              <button onClick={insertAtIndex} className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Insert at Index
              </button>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Delete Node</p>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={indexVal}
                onChange={(e) => setIndexVal(e.target.value)}
                placeholder="Index"
                className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm w-20 focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={deleteAtHead} className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Delete Head
              </button>
              <button onClick={deleteAtTail} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Delete Tail
              </button>
              <button onClick={deleteAtIndex} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Delete at Index
              </button>
            </div>
          </div>

        </div>

        <button onClick={reset} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-6">
          Reset
        </button>

        <div className={`text-sm mb-6 font-medium ${messageColor[lastAction] || 'text-gray-400'}`}>
          {message}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-x-auto">
          {list.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-gray-600 text-sm border-2 border-dashed border-gray-700 rounded-xl">
              Empty List — HEAD → NULL
            </div>
          ) : (
            <div className="flex items-center gap-0 flex-nowrap min-w-max">

              <div className="flex flex-col items-center mr-2">
                <span className="text-xs text-orange-400 font-medium mb-1">HEAD</span>
                <span className="text-orange-400 text-lg">↓</span>
              </div>

              {list.map((node, index) => (
                <div key={node.id} className="flex items-center">

                  <div className={`flex flex-col rounded-xl border-2 overflow-hidden transition-all duration-300
                    ${node.isNew ? 'scale-110' : 'scale-100'}
                    ${highlightIndex === index
                      ? 'border-orange-400 bg-orange-900'
                      : 'border-gray-600 bg-gray-800'
                    }`}
                  >
                    <div className="px-1 py-0.5 bg-gray-700 text-center">
                      <span className="text-xs text-gray-400">idx {index}</span>
                    </div>
                    <div className="px-4 py-3 text-center">
                      <span className={`text-sm font-bold ${highlightIndex === index ? 'text-orange-300' : 'text-white'}`}>
                        {node.value}
                      </span>
                    </div>
                    <div className="px-1 py-0.5 bg-gray-700 text-center border-t border-gray-600">
                      <span className="text-xs text-blue-400">next →</span>
                    </div>
                  </div>

                  {index < list.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className="w-6 h-px bg-blue-500" />
                      <span className="text-blue-400 text-sm">→</span>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center ml-2">
                <div className="w-6 h-px bg-gray-600" />
                <span className="text-gray-500 text-sm ml-1">→ NULL</span>
              </div>

            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-orange-400">{list.length}</div>
            <div className="text-xs text-gray-500 mt-1">Total nodes</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-gray-300">
              {list.length > 0 ? list[0].value : '—'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Head value</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-lg font-bold text-gray-300">
              {list.length > 0 ? list[list.length - 1].value : '—'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Tail value</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LinkedListPage