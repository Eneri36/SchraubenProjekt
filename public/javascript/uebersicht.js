(async function uebersicht() {
    const ergebnis = await fetch("/uebersicht");
    const antworten = await ergebnis.json();
    const data = {
        datasets: [
            {
                label: "Verkaufte Gesamtmenge",
                data: antworten,
                backgroundColor: "#26495c",
                borderColor: "#26495c",
            },
        ],
    };

    new Chart(document.getElementById("lineUebersicht"), {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    });
})();
(async function UmsatzSchraubenArt() {
    const ergebnis = await fetch("/uebersicht/umsatzschraubenart");
    const antworten = await ergebnis.json();
    const data = {
        datasets: [
            {
                label: "Gesamtumsatz pro Schraubenart",
                data: antworten.Schraubenumsatz,
                backgroundColor: "#26495c",
            },
        ],
    };

    new Chart(document.getElementById("UmsatzSchraubenArt"), {
        type: "bar",
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
})();
(async function umsatzschraubenarthersteller() {
    const ergebnis = await fetch("/uebersicht/umsatzschraubenarthersteller");
    const antworten = await ergebnis.json();
    console.log(antworten);
    const data = {
        datasets: [
            {
                label: "Gesamtumsatz pro Schraubenart SWG",
                data: antworten.SchraubenumsatzHersteller.SWG,
                backgroundColor: "#c66b3d",
            },
            {
                label: "Gesamtumsatz pro Schraubenart HECO",
                data: antworten.SchraubenumsatzHersteller.HECO,
                backgroundColor: "#26495c",
            },
            {
                label: "Gesamtumsatz pro Schraubenart Würth",
                data: antworten.SchraubenumsatzHersteller.Wuerth,
                backgroundColor: "#c4a35a",
            },
        ],
    };

    new Chart(document.getElementById("UmsatzSchraubenArtHersteller"), {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true,
                },
                x: {
                    beginAtZero: true,
                    stacked: true,
                },
            },
        },
    });
})();
(async function gesamtumsatzhersteller() {
    const ergebnis = await fetch("/uebersicht/gesamtumsatzhersteller");
    const antworten = await ergebnis.json();
    const data = {
        datasets: [
            {
                label: "Gesamtumsatz SWG",
                data: antworten.SchraubenumsatzHersteller.SWG,
                backgroundColor: "#c66b3d",
                borderColor: "#c66b3d",
            },
            {
                label: "Gesamtumsatz HECO",
                data: antworten.SchraubenumsatzHersteller.HECO,
                backgroundColor: "#26495c",
                borderColor: "#26495c",
            },
            {
                label: "Gesamtumsatz Würth",
                data: antworten.SchraubenumsatzHersteller.Wuerth,
                backgroundColor: "#c4a35a",
                borderColor: "#c4a35a",
            },
        ],
    };

    new Chart(document.getElementById("GesamtumsatzHersteller"), {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    });
})();
function toggleDialog(dialogId) {
    const dialogElements = document.querySelectorAll(".dialog-container");
    dialogElements.forEach((dialog) => {
        dialog.classList.remove("show");
    });
    const dialog = document.getElementById(dialogId);
    dialog.classList.add("show");
}
