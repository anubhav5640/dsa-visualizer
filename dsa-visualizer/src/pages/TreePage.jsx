import { useState, useRef } from 'react'
import ComplexityBadge from '../components/ComplexityBadge'
import sleep from '../utils/sleep'

class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() { this.root = null }

  insert(value) {
    const node = new TreeNode(value)
    if (!this.root) { this.root = node; return }
    let curr = this.root
    while (true) {
      if (value < curr.value) {
        if (!curr.left) { curr.left = node; return }
        curr = curr.left
      } else {
        if (!curr.right) { curr.right = node; return }
        curr = curr.right
      }
    }
  }

  toPositionMap(root, x, y, gap) {
    if (!root) return {}
    const map = {}
    const traverse = (node, x, y, gap) => {
      if (!node) return
      map[node.value] = { x, y, node }
      traverse(node.left, x - gap, y + 80, gap / 2)
      traverse(node.right, x + gap, y + 80, gap / 2)
    }
    traverse(root, x, y, gap)
    return map
  }
}

function TreePage() {
  const [inputVal, setInputVal] = useState('')
  const [highlighted, setHighlighted] = useState([])
  const [message, setMessage] = useState('Insert nodes to build your BST.')
  const [traversalOrder, setTraversalOrder] = useState([])
  const bstRef = useRef(new BST())
  const [, forceRender] = useState(0)
  const isAnimating = useRef(false)

  const handleInsert = () => {
    const val = parseInt(inputVal)
    if (isNaN(val)) { setMessage('Enter a valid number.'); return }
    bstRef.current.insert(val)
    setMessage(`Inserted ${val} into the BST.`)
    setInputVal('')
    forceRender(n => n + 1)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleInsert()
  }

  const animateTraversal = async (order, name) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setTraversalOrder(order)
    setMessage(`${name} traversal: [${order.join(', ')}]`)
    for (let i = 0; i < order.length; i++) {
      setHighlighted(order.slice(0, i + 1))
      await sleep(600)
    }
    isAnimating.current = false
  }

  const getInorder = (node, result = []) => {
    if (!node) return result
    getInorder(node.left, result)
    result.push(node.value)
    getInorder(node.right, result)
    return result
  }

  const getPreorder = (node, result = []) => {
    if (!node) return result
    result.push(node.value)
    getPreorder(node.left, result)
    getPreorder(node.right, result)
    return result
  }

  const getPostorder = (node, result = []) => {
    if (!node) return result
    getPostorder(node.left, result)
    getPostorder(node.right, result)
    result.push(node.value)
    return result
  }

  const reset = () => {
    bstRef.current = new BST()
    setHighlighted([])
    setTraversalOrder([])
    setMessage('Tree cleared. Insert new nodes.')
    forceRender(n => n + 1)
  }

  const root = bstRef.current.root
  const posMap = root ? bstRef.current.toPositionMap(root, 300, 40, 120) : {}
  const positions = Object.values(posMap)

  const edges = []
  positions.forEach(({ node, x, y }) => {
    if (node.left && posMap[node.left.value]) {
      const child = posMap[node.left.value]
      edges.push({ x1: x, y1: y, x2: child.x, y2: child.y })
    }
    if (node.right && posMap[node.right.value]) {
      const child = posMap[node.right.value]
      edges.push({ x1: x, y1: y, x2: child.x, y2: child.y })
    }
  })

  const svgWidth = 600
  const svgHeight = positions.length > 0
    ? Math.max(...positions.map(p => p.y)) + 80
    : 100

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold mb-2 text-red-400">Binary Search Tree</h1>
        <p className="text-gray-400 text-sm mb-4">Insert nodes and animate traversals</p>

        <ComplexityBadge time="O(log n) avg insert" space="O(n)" />

        <div className="flex gap-3 mb-4 flex-wrap items-center">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter number..."
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm w-40 focus:outline-none focus:border-red-500"
          />
          <button onClick={handleInsert} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Insert
          </button>
          <button onClick={reset} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Reset
          </button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => animateTraversal(getInorder(root), 'Inorder')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Inorder (Left→Root→Right)
          </button>
          <button
            onClick={() => animateTraversal(getPreorder(root), 'Preorder')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Preorder (Root→Left→Right)
          </button>
          <button
            onClick={() => animateTraversal(getPostorder(root), 'Postorder')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Postorder (Left→Right→Root)
          </button>
        </div>

        <div className="text-sm font-medium text-gray-300 mb-6 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 min-h-[48px]">
          {message}
        </div>

        {traversalOrder.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {traversalOrder.map((val, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-lg text-sm font-mono font-medium transition-all duration-300
                  ${highlighted.includes(val)
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-800 text-gray-500'
                  }`}
              >
                {val}
              </span>
            ))}
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto">
          {!root ? (
            <div className="flex items-center justify-center h-32 text-gray-600 text-sm border-2 border-dashed border-gray-700 rounded-xl">
              Tree is empty — insert a number to start
            </div>
          ) : (
            <svg width={svgWidth} height={svgHeight} className="mx-auto block">
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.x1} y1={e.y1}
                  x2={e.x2} y2={e.y2}
                  stroke="#4B5563"
                  strokeWidth="2"
                />
              ))}
              {positions.map(({ node, x, y }) => {
                const isHighlighted = highlighted.includes(node.value)
                return (
                  <g key={node.value}>
                    <circle
                      cx={x} cy={y} r={22}
                      fill={isHighlighted ? '#EAB308' : '#1F2937'}
                      stroke={isHighlighted ? '#FDE047' : '#4B5563'}
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                    <text
                      x={x} y={y + 5}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill={isHighlighted ? '#1a1a1a' : '#F9FAFB'}
                    >
                      {node.value}
                    </text>
                  </g>
                )
              })}
            </svg>
          )}
        </div>

      </div>
    </div>
  )
}

export default TreePage