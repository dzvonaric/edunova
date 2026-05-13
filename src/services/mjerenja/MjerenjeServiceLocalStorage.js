const KLJUC = 'akvarij-mjerenja'

function ucitaj() {
    return JSON.parse(localStorage.getItem(KLJUC) || '[]')
}

function spremi(mjerenja) {
    localStorage.setItem(KLJUC, JSON.stringify(mjerenja))
}

function generirajId() {
    return Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase()
}

async function get() {
    return { success: true, data: ucitaj() }
}

async function getById(id) {
    const mjerenja = ucitaj()
    return { success: true, data: mjerenja.find(m => m.id === id) }
}

async function dodaj(mjerenje) {
    const mjerenja = ucitaj()
    mjerenje.id = generirajId()
    mjerenje.kreiranAt = new Date().toISOString()
    mjerenja.unshift(mjerenje)
    spremi(mjerenja)
    return { success: true }
}

async function promjeni(id, mjerenje) {
    const mjerenja = ucitaj()
    const index = mjerenja.findIndex(m => m.id === id)
    mjerenja[index] = { ...mjerenja[index], ...mjerenje }
    spremi(mjerenja)
    return { success: true }
}

async function obrisi(id) {
    spremi(ucitaj().filter(m => m.id !== id))
    return { success: true }
}

export default {
    get,
    getById,
    dodaj,
    promjeni,
    obrisi,
}
