(async function HecoUebersicht() {
    const ergebnis = await fetch("/wuerth/uebersicht");
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

    new Chart(document.getElementById("WuerthUebersicht"), {
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
    const umsatz = await fetch("/wuerth/gesamtumsatz");
    const gesamtumsatz = await umsatz.json();
    document.getElementById("gesamtumsatz").innerHTML =
        "Der gesamte Umsatz von Würth beträgt im Juni " +
        gesamtumsatz.gesamtumsatz +
        " Euro.";

    const umsatzProSchraube = await fetch("/wuerth/umsatzproschraube");
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

    new Chart(document.getElementById("WuerthKategorien"), {
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
