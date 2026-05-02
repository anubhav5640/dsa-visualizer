import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SortingPage from './pages/SortingPage'
import StackPage from './pages/StackPage'
import QueuePage from './pages/QueuePage'
import LinkedListPage from './pages/LinkedListPage'
import TreePage from './pages/TreePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<SortingPage />} />
            <Route path="/stack" element={<StackPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/linked-list" element={<LinkedListPage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App