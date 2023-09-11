(async function HecoUebersicht() {
    const umsatz = await fetch("/SWG/gesamtumsatz");
    const gesamtumsatz = await umsatz.json();
    document.getElementById("gesamtumsatz").innerHTML =
        "Der gesamte Umsatz von SWG beträgt im Juni " +
        gesamtumsatz.gesamtumsatz +
        " Euro.";

    const ergebnis = await fetch("/SWG/uebersicht");
    const antworten = await ergebnis.json();

    const data = {
        datasets: [
            {
                label: "Verkaufte Gesamtmenge",
                data: antworten,
                borderColor: ["#26495c"],
            },
        ],
    };

    new Chart(document.getElementById("SWGUebersicht"), {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    const umsatzProSchraube = await fetch("/SWG/umsatzproschraube");
    const schraubenUmsatz = await umsatzProSchraube.json();
    const dataSchraubenumsatz = {
        datasets: [
            {
                label: "Umsatz pro Schraubenkategorie",
                data: schraubenUmsatz.Schraubenumsatz,
                backgroundColor: ["#c66b3d", "#26495c", "#c4a35a"],
            },
        ],
    };

    new Chart(document.getElementById("SWGKategorien"), {
        type: "bar",
        data: dataSchraubenumsatz,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
})();
