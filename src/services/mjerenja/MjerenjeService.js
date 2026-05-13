import { DATA_SOURCE } from '../../constants'
import MjerenjeServiceLocalStorage from './MjerenjeServiceLocalStorage'
import MjerenjeServiceMemorija from './MjerenjeServiceMemorija'

let Servis

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = MjerenjeServiceMemorija
        break
    case 'localStorage':
        Servis = MjerenjeServiceLocalStorage
        break
    default:
        Servis = null
}

export default Servis
