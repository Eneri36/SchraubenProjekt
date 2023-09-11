(async function uebersicht() {
    const ergebnis = await fetch("/besterverkaufstag");
    const antwort = await ergebnis.json();
  
    const besterVerkaufstag = antwort.tag;
    const highVerkauf = antwort.verkaufsmenge;
  
    const ausgabeElement = document.getElementById("besterverkaufstag");
    ausgabeElement.innerText = `Bester Verkaufstag:\n ${besterVerkaufstag}\n Mit ${highVerkauf} Stück. `;
   
  })();
  