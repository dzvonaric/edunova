function broj(podaci, naziv) {
    return parseFloat(podaci.get(naziv))
}

export function procitajMjerenjeIzForme(form) {
    const podaci = new FormData(form)

    return {
        datum: podaci.get('datum'),
        temperatura: broj(podaci, 'temperatura'),
        ph: broj(podaci, 'ph'),
        tds: broj(podaci, 'tds'),
        ec: broj(podaci, 'ec'),
        salinitet: broj(podaci, 'salinitet'),
        orp: broj(podaci, 'orp'),
        napomena: podaci.get('napomena')?.trim() || null,
    }
}
