(async function uebersicht() {
    const ergebnis = await fetch("/top3hersteller");
    const antworten = await ergebnis.json();

    var labels = [];
    var numbers = [];

    antworten.forEach((element) => {
        labels.push(element._id);
        numbers.push(element.sum);
    });

    data = {
        datasets: [
            {
                data: numbers,
                backgroundColor: ["#26495c", "#c4a35a", "#c66b3d"],
            },
        ],

        labels: labels,
    };

    new Chart(document.getElementById("top3hersteller"), {
        type: "pie",
        data: data,
    });
})();
