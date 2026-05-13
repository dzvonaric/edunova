import { mjerenja } from './MjerenjePodaci'

function generirajId() {
    return Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase()
}

function nadiIndex(id) {
    return mjerenja.findIndex(m => m.id === id)
}

async function get() {
    return { success: true, data: [...mjerenja] }
}

async function getById(id) {
    return { success: true, data: mjerenja.find(m => m.id === id) }
}

async function dodaj(mjerenje) {
    mjerenje.id = generirajId()
    mjerenje.kreiranAt = new Date().toISOString()
    mjerenja.unshift(mjerenje)
    return { success: true }
}

async function promjeni(id, mjerenje) {
    const index = nadiIndex(id)
    mjerenja[index] = { ...mjerenja[index], ...mjerenje }
    return { success: true }
}

async function obrisi(id) {
    const index = nadiIndex(id)
    mjerenja.splice(index, 1)
    return { success: true }
}

export default {
    get,
    getById,
    dodaj,
    promjeni,
    obrisi,
}
