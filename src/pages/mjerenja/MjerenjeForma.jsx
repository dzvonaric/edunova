import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../constants'

export default function MjerenjeForma({ naslov, mjerenje, submitTekst, onSubmit }) {
    const danas = new Date().toISOString().slice(0, 10)

    return (
        <>
            <h3 className="mb-4">{naslov}</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="datum" className="mb-3">
                    <Form.Label>Datum mjerenja</Form.Label>
                    <Form.Control
                        type="date"
                        name="datum"
                        defaultValue={mjerenje?.datum || danas}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="temperatura">
                            <Form.Label>Temperatura (°C)</Form.Label>
                            <Form.Control type="number" name="temperatura" min="0" step="0.1" defaultValue={mjerenje?.temperatura ?? ''} placeholder="npr. 25.5" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="ph">
                            <Form.Label>pH</Form.Label>
                            <Form.Control type="number" name="ph" min="0" max="14" step="0.01" defaultValue={mjerenje?.ph ?? ''} placeholder="npr. 7.20" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="tds">
                            <Form.Label>TDS (ppm)</Form.Label>
                            <Form.Control type="number" name="tds" min="0" step="1" defaultValue={mjerenje?.tds ?? ''} placeholder="npr. 180" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="ec">
                            <Form.Label>EC (µS/cm)</Form.Label>
                            <Form.Control type="number" name="ec" min="0" step="1" defaultValue={mjerenje?.ec ?? ''} placeholder="npr. 360" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="salinitet">
                            <Form.Label>Salinitet (ppt)</Form.Label>
                            <Form.Control type="number" name="salinitet" min="0" step="0.01" defaultValue={mjerenje?.salinitet ?? ''} placeholder="npr. 0.15" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="orp">
                            <Form.Label>ORP (mV)</Form.Label>
                            <Form.Control type="number" name="orp" step="1" defaultValue={mjerenje?.orp ?? ''} placeholder="npr. 250" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="napomena" className="mb-4">
                    <Form.Label>Napomena</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="napomena"
                        rows={3}
                        defaultValue={mjerenje?.napomena || ''}
                        placeholder="Opcionalno: izmjena vode, dodani preparati, opažanja..."
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Link to={RouteNames.MJERENJA} className="btn btn-danger">Odustani</Link>
                    </Col>
                    <Col className="desno">
                        <Button type="submit" variant="primary">{submitTekst}</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
