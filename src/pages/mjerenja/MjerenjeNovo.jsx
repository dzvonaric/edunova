import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../../constants'
import MjerenjeService from '../../services/mjerenja/MjerenjeService'
import MjerenjeForma from './MjerenjeForma'
import { procitajMjerenjeIzForme } from './mjerenjeFormaUtils'

export default function MjerenjeNovo() {
    const navigate = useNavigate()

    async function dodaj(mjerenje) {
        await MjerenjeService.dodaj(mjerenje).then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            navigate(RouteNames.MJERENJA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        dodaj(procitajMjerenjeIzForme(e.target))
    }

    return (
        <MjerenjeForma
            naslov="Novo mjerenje vode"
            submitTekst="Spremi mjerenje"
            onSubmit={odradiSubmit}
        />
    )
}
