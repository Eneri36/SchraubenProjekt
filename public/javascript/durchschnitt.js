(async function uebersicht() {
    const ergebnis = await fetch("/durchschnitt");
    const antwort = await ergebnis.json();
  
    const wochenListe = antwort;
  
    const ausgabeElement = document.getElementById("besterTagProWoche");
  
    const wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    
    wochenListe.forEach((woche) => {
      const { woche: wochenNummer, tag: datum, verkaufsmenge } = woche;
      const tag = new Date(datum);
      const wochentag = wochentage[tag.getDay()];
  
      const ausgabe = `<div><h3>Woche ${wochenNummer}:</h3><p> ${wochentag}</p><p>${verkaufsmenge} Stück</p></div>`;
      
      ausgabeElement.innerHTML += ausgabe;
    });
  })();
  