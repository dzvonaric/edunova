import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RouteNames } from '../../constants'
import MjerenjeService from '../../services/mjerenja/MjerenjeService'
import MjerenjeForma from './MjerenjeForma'
import { procitajMjerenjeIzForme } from './mjerenjeFormaUtils'

export default function MjerenjePromjena() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [mjerenje, setMjerenje] = useState(null)

    useEffect(() => {
        MjerenjeService.getById(id).then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setMjerenje(odgovor.data)
        })
    }, [id])

    async function promjeni(podaci) {
        await MjerenjeService.promjeni(id, podaci).then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            navigate(RouteNames.MJERENJA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        promjeni(procitajMjerenjeIzForme(e.target))
    }

    if (!mjerenje) return <p className="mt-4 text-muted">Učitavanje...</p>

    return (
        <MjerenjeForma
            naslov="Uredi mjerenje vode"
            mjerenje={mjerenje}
            submitTekst="Spremi promjene"
            onSubmit={odradiSubmit}
        />
    )
}
