import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Button, Container } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'
import Home from './pages/Home'
import MjerenjePregled from './pages/mjerenja/MjerenjePregled'
import MjerenjeNovo from './pages/mjerenja/MjerenjeNovo'
import MjerenjePromjena from './pages/mjerenja/MjerenjePromjena'

function Zaglavlje() {
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <button className="brand-button" type="button" onClick={() => navigate(RouteNames.HOME)}>
        <span className="brand-mark">A</span>
        <span>
          <span className="brand-title">{IME_APLIKACIJE}</span>
          <span className="brand-subtitle">Dnevnik parametara vode</span>
        </span>
      </button>

      <div className="header-actions">
        <Button variant="outline-light" size="sm" onClick={() => navigate(RouteNames.MJERENJA)}>
          Pregled
        </Button>
        <Button variant="light" size="sm" onClick={() => navigate(RouteNames.MJERENJA_NOVO)}>
          + Novo mjerenje
        </Button>
      </div>
    </header>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Container>
        <Zaglavlje />
      </Container>
      <Container className="app">
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.MJERENJA} element={<MjerenjePregled />} />
          <Route path={RouteNames.MJERENJA_NOVO} element={<MjerenjeNovo />} />
          <Route path={RouteNames.MJERENJA_PROMJENA} element={<MjerenjePromjena />} />
        </Routes>
      </Container>
      <Container>
        <footer className="app-footer">
          &copy; {IME_APLIKACIJE} | Denis Zvonarić
        </footer>
      </Container>
    </div>
  )
}

export default App
