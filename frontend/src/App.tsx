import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import SongPage from './pages/SongPage'
import DeckPage from './pages/DeckPage'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<SearchPage />} />
        <Route path='/song/:songId' element={<SongPage />} />
        <Route path='/deck' element={<DeckPage />} />
      </Routes>
    </>
  )
}

export default App
