export function findeBestenVerkaufstag(uebersicht) {
    let besterTag = 0;
    let maxVerkaufsmenge = 0;

    for (const tag in uebersicht) {
        if (uebersicht[tag] > maxVerkaufsmenge) {
            maxVerkaufsmenge = uebersicht[tag];
            besterTag = tag;
        }
    }

    return { tag: besterTag, verkaufsmenge: maxVerkaufsmenge };
}

export function findeBestenVerkaufstage(uebersicht) {
    const bestenVerkaufstage = [];
    const tage = Object.keys(uebersicht);
    const wochenAnzahl = Math.ceil(tage.length / 7);

    for (let i = 0; i < wochenAnzahl; i++) {
        const start = i * 7;
        const ende = start + 7;
        const tageWoche = tage.slice(start, ende);

        let besterTag = null;
        let maxVerkaufsmenge = 0;

        for (const tag of tageWoche) {
            if (uebersicht[tag] > maxVerkaufsmenge) {
                maxVerkaufsmenge = uebersicht[tag];
                besterTag = tag;
            }
        }

        bestenVerkaufstage.push({
            woche: i + 1,
            tag: besterTag,
            verkaufsmenge: maxVerkaufsmenge,
        });
    }

    return bestenVerkaufstage;
}
