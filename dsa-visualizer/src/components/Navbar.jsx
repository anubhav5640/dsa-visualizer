import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/sorting', label: 'Sorting' },
  { to: '/stack', label: 'Stack' },
  { to: '/queue', label: 'Queue' },
  { to: '/linked-list', label: 'Linked List' },
  { to: '/tree', label: 'Tree' },
]

function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
      <Link to="/" className="text-xl font-bold text-blue-400 tracking-tight">
        DSA Visualizer
      </Link>

      <div className="flex gap-1">
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
    </nav>
  )
}

export default Navbar