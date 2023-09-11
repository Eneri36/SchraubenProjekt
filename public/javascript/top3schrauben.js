(async function uebersicht() {
    const ergebnis = await fetch("/top3schrauben");
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
                backgroundColor: ["#c66b3d", "#26495c", "#c4a35a"],
            },
        ],

        labels: labels,
    };

    new Chart(document.getElementById("top3schrauben"), {
        type: "pie",
        data: data,
    });
})();
