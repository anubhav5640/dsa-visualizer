import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-8xl font-bold text-gray-800">404</div>
      <h1 className="text-2xl font-bold text-white">Page not found</h1>
      <p className="text-gray-400 text-center max-w-sm">
        The page you are looking for does not exist. Go back home and pick an algorithm to visualize.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound