import { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { RouteNames } from '../../constants'
import FormatDatuma from '../../components/FormatDatuma'
import useBreakpoint from '../../hooks/useBreakpoint'
import MjerenjeService from '../../services/mjerenja/MjerenjeService'

function broj(vrijednost, decimale = 1) {
    if (vrijednost === null || vrijednost === undefined || Number.isNaN(vrijednost)) return '-'
    return Number(vrijednost).toFixed(decimale)
}

function PhBadge({ ph }) {
    const variant = ph < 6.8 || ph > 7.8 ? 'warning' : 'success'
    return <Badge bg={variant} text={variant === 'warning' ? 'dark' : undefined}>{broj(ph, 2)}</Badge>
}

function MjerenjeGrid({ mjerenja, navigate, traziBrisanje }) {
    if (mjerenja.length === 0) {
        return (
            <p className="text-center text-muted py-4">
                Nema mjerenja. <Link to={RouteNames.MJERENJA_NOVO}>Dodajte prvo mjerenje</Link>
            </p>
        )
    }

    return (
        <Row xs={1} sm={2} md={2} lg={3} className="g-3">
            {mjerenja.map(m => (
                <Col key={m.id}>
                    <Card className="h-100 mjerenje-card">
                        <Card.Body>
                            <Card.Title style={{ fontSize: '15px' }}>
                                <FormatDatuma datum={m.datum} />
                            </Card.Title>
                            <div className="parametar">Temperatura: <strong>{broj(m.temperatura)} °C</strong></div>
                            <div className="parametar">pH: <PhBadge ph={m.ph} /></div>
                            <div className="parametar">TDS: <strong>{broj(m.tds, 0)} ppm</strong></div>
                            <div className="parametar">EC: <strong>{broj(m.ec, 0)} µS/cm</strong></div>
                            <div className="parametar">Salinitet: <strong>{broj(m.salinitet, 2)} ppt</strong></div>
                            <div className="parametar">ORP: <strong>{broj(m.orp, 0)} mV</strong></div>
                            {m.napomena && <p className="text-muted mt-2 mb-0" style={{ fontSize: '13px' }}>{m.napomena}</p>}
                        </Card.Body>
                        <Card.Footer className="d-flex gap-2">
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/mjerenja/${m.id}`)}>
                                <BsPencil /> Uredi
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => traziBrisanje(m.id)}>
                                <BsTrash /> Obriši
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

function MjerenjeTablica({ mjerenja, navigate, traziBrisanje }) {
    return (
        <Table className="mjerenje-table" striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Temp (°C)</th>
                    <th>pH</th>
                    <th>TDS (ppm)</th>
                    <th>EC (µS/cm)</th>
                    <th>Salinitet (ppt)</th>
                    <th>ORP (mV)</th>
                    <th>Napomena</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {mjerenja.length === 0 ? (
                    <tr>
                        <td colSpan={9} className="text-center text-muted py-4">
                            Nema mjerenja. <Link to={RouteNames.MJERENJA_NOVO}>Dodajte prvo mjerenje</Link>
                        </td>
                    </tr>
                ) : (
                    mjerenja.map(m => (
                        <tr key={m.id}>
                            <td><FormatDatuma datum={m.datum} /></td>
                            <td className="text-end">{broj(m.temperatura)} °C</td>
                            <td><PhBadge ph={m.ph} /></td>
                            <td className="text-end">{broj(m.tds, 0)}</td>
                            <td className="text-end">{broj(m.ec, 0)}</td>
                            <td className="text-end">{broj(m.salinitet, 2)}</td>
                            <td className="text-end">{broj(m.orp, 0)}</td>
                            <td>{m.napomena || <span className="text-muted">-</span>}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/mjerenja/${m.id}`)}>
                                    <BsPencil />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => traziBrisanje(m.id)}>
                                    <BsTrash />
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    )
}

function BrisanjePopup({ otvoren, onOdustani, onObrisi }) {
    if (!otvoren) return null

    return (
        <div className="delete-modal-backdrop">
            <div className="delete-modal" role="dialog" aria-modal="true">
                <div className="delete-modal-icon"><BsTrash /></div>
                <h2>Želiš li obrisati?</h2>
                <p>Mjerenje će biti trajno obrisano iz povijesti.</p>
                <div className="delete-modal-actions">
                    <Button variant="outline-secondary" onClick={onOdustani}>Odustani</Button>
                    <Button variant="danger" onClick={onObrisi}>Obriši</Button>
                </div>
            </div>
        </div>
    )
}

export default function MjerenjePregled() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const [mjerenja, setMjerenja] = useState([])
    const [brisanjeId, setBrisanjeId] = useState(null)

    async function ucitajMjerenja() {
        await MjerenjeService.get().then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setMjerenja(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajMjerenja()
    }, [])

    async function potvrdiBrisanje() {
        if (!brisanjeId) return
        await MjerenjeService.obrisi(brisanjeId)
        setBrisanjeId(null)
        ucitajMjerenja()
    }

    return (
        <>
            <Link to={RouteNames.MJERENJA_NOVO} className="btn btn-primary w-100 mb-3">
                + Dodaj novo mjerenje
            </Link>

            {['xs', 'sm', 'md'].includes(sirina) ? (
                <MjerenjeGrid mjerenja={mjerenja} navigate={navigate} traziBrisanje={setBrisanjeId} />
            ) : (
                <MjerenjeTablica mjerenja={mjerenja} navigate={navigate} traziBrisanje={setBrisanjeId} />
            )}

            <BrisanjePopup
                otvoren={brisanjeId !== null}
                onOdustani={() => setBrisanjeId(null)}
                onObrisi={potvrdiBrisanje}
            />
        </>
    )
}
