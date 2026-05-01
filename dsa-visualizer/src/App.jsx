// App.jsx
// This is the "router" — it decides which page component to show based on the URL
// BrowserRouter wraps everything and enables URL-based navigation
// Routes = container for all your Route definitions
// Route = maps a URL path to a component
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import SortingPage from './pages/SortingPage'
import StackPage from './pages/StackPage'
import QueuePage from './pages/QueuePage'
import LinkedListPage from './pages/LinkedListPage'
import TreePage from './pages/TreePage'

function App() {
  return (
    // BrowserRouter must wrap everything that uses routing
    <BrowserRouter>
      {/* Navbar is OUTSIDE <Routes> so it shows on every page */}
      <Navbar />

      {/* Routes looks at the current URL and renders the matching Route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/stack" element={<StackPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/linked-list" element={<LinkedListPage />} />
        <Route path="/tree" element={<TreePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App