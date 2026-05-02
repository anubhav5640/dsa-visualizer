import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useDarkMode from '../hooks/useDarkMode'

const links = [
  { to: '/sorting', label: 'Sorting' },
  { to: '/stack', label: 'Stack' },
  { to: '/queue', label: 'Queue' },
  { to: '/linked-list', label: 'Linked List' },
  { to: '/tree', label: 'Tree' },
]

function Navbar() {
  const location = useLocation()
  const { isDark, toggle } = useDarkMode()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-400 tracking-tight">
          DSA Visualizer
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-lg"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <span className="text-white text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>

          <div className="hidden md:flex gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === link.to
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 px-4 pb-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === link.to
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar