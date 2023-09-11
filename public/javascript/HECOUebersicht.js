(async function HecoUebersicht() {
    const ergebnis = await fetch("/heco/uebersicht");
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

    new Chart(document.getElementById("HecoUebersicht"), {
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
    const umsatz = await fetch("/heco/gesamtumsatz");
    const gesamtumsatz = await umsatz.json();
    document.getElementById("gesamtumsatz").innerHTML =
        "<p>Der gesamte Umsatz von Heco beträgt im Monat Juni " +
        gesamtumsatz.gesamtumsatz +
        " Euro.</p>";

    const umsatzProSchraube = await fetch("/heco/umsatzproschraube");
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

    new Chart(document.getElementById("HecoKategorien"), {
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
