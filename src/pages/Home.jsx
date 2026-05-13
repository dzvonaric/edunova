import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../constants'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="hero-panel">
            <div>
                <h1 className="hero-title">Mjerenja vode</h1>
                <p className="hero-copy">
                    Sve za zdrav akvarij. Brz unos i pregled ključnih parametara: temperatura,
                    pH, TDS, EC, salinitet i ORP.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                    <Button variant="primary" size="lg" onClick={() => navigate(RouteNames.MJERENJA_NOVO)}>
                        + Novo mjerenje
                    </Button>
                    <Button variant="outline-secondary" size="lg" onClick={() => navigate(RouteNames.MJERENJA)}>
                        Pregled mjerenja
                    </Button>
                </div>
            </div>

            <div className="hero-image-card">
                <img src="/akvarij.png" alt="Mjerenja vode u akvariju" />
            </div>
        </div>
    )
}
