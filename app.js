import express from "express";
import { mongoQuery, db } from "./mongo.js";
import path from "path";
import { fileURLToPath } from "url";
import { findeBestenVerkaufstag } from "./function.js";
import { findeBestenVerkaufstage } from "./function.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/view/index.html");
});

app.get("/uebersicht", async function (req, res) {
    const ergebnisse = await mongoQuery(db.find({}));
    const uebersicht = {};
    ergebnisse.forEach((ergebnis) => {
        const { Datum, VerkaufteMenge } = ergebnis._doc;
        if (uebersicht[Datum]) uebersicht[Datum] += VerkaufteMenge;
        else uebersicht[Datum] = VerkaufteMenge;
    });
    res.send(uebersicht);
});
app.get("/uebersicht/:param", async function (req, res) {
    if (req.params.param === "umsatzschraubenart") {
        const ergebnisse = await mongoQuery(db.find({}));
        let schraubenumsatz = {};
        ergebnisse.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenumsatz[Schraube]) {
                schraubenumsatz[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenumsatz[Schraube] = VerkaufteMenge * Preis;
            }
        });
        res.json({ Schraubenumsatz: schraubenumsatz });
    } else if (req.params.param === "umsatzschraubenarthersteller") {
        const ergebnisseSWG = await mongoQuery(db.find({ Hersteller: "SWG" }));
        const ergebnisseHeco = await mongoQuery(
            db.find({ Hersteller: "HECO" })
        );
        const ergebnisseWuerth = await mongoQuery(
            db.find({ Hersteller: "Wuerth" })
        );
        let schraubenUmsatzSWG = {};
        let schraubenUmsatzHeco = {};
        let schraubenUmsatzWuerth = {};
        let schraubenUmsatzHersteller = {};

        ergebnisseSWG.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenUmsatzSWG[Schraube]) {
                schraubenUmsatzSWG[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenUmsatzSWG[Schraube] = VerkaufteMenge * Preis;
            }
        });
        ergebnisseHeco.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenUmsatzHeco[Schraube]) {
                schraubenUmsatzHeco[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenUmsatzHeco[Schraube] = VerkaufteMenge * Preis;
            }
        });
        ergebnisseWuerth.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenUmsatzWuerth[Schraube]) {
                schraubenUmsatzWuerth[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenUmsatzWuerth[Schraube] = VerkaufteMenge * Preis;
            }
        });
        schraubenUmsatzHersteller["HECO"] = schraubenUmsatzHeco;
        schraubenUmsatzHersteller["SWG"] = schraubenUmsatzSWG;
        schraubenUmsatzHersteller["Wuerth"] = schraubenUmsatzWuerth;
        res.json({ SchraubenumsatzHersteller: schraubenUmsatzHersteller });
    } else if (req.params.param === "gesamtumsatzhersteller") {
        const ergebnisseSWG = await mongoQuery(db.find({ Hersteller: "SWG" }));
        const ergebnisseHeco = await mongoQuery(
            db.find({ Hersteller: "HECO" })
        );
        const ergebnisseWuerth = await mongoQuery(
            db.find({ Hersteller: "Wuerth" })
        );
        let schraubenUmsatzSWG = {};
        let schraubenUmsatzHeco = {};
        let schraubenUmsatzWuerth = {};
        let schraubenUmsatzHersteller = {};

        ergebnisseSWG.forEach((ergebnis) => {
            const { Datum, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenUmsatzSWG[Datum]) {
                schraubenUmsatzSWG[Datum] += VerkaufteMenge * Preis;
            } else {
                schraubenUmsatzSWG[Datum] = VerkaufteMenge * Preis;
            }
        });
        ergebnisseHeco.forEach((ergebnis) => {
            const { Datum, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenUmsatzHeco[Datum]) {
                schraubenUmsatzHeco[Datum] += VerkaufteMenge * Preis;
            } else {
                schraubenUmsatzHeco[Datum] = VerkaufteMenge * Preis;
            }
        });
        ergebnisseWuerth.forEach((ergebnis) => {
            const { Datum, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenUmsatzWuerth[Datum]) {
                schraubenUmsatzWuerth[Datum] += VerkaufteMenge * Preis;
            } else {
                schraubenUmsatzWuerth[Datum] = VerkaufteMenge * Preis;
            }
        });
        schraubenUmsatzHersteller["HECO"] = schraubenUmsatzHeco;
        schraubenUmsatzHersteller["SWG"] = schraubenUmsatzSWG;
        schraubenUmsatzHersteller["Wuerth"] = schraubenUmsatzWuerth;
        res.json({
            SchraubenumsatzHersteller: schraubenUmsatzHersteller,
        });
    }
});
app.get("/top3schrauben", async (req, res) => {
    const ergebnisse = await mongoQuery(
        db.aggregate([
            { $group: { _id: "$Schraube", sum: { $sum: "$VerkaufteMenge" } } },
            { $sort: { sum: -1 } },
            { $limit: 3 },
        ])
    );
    res.json(ergebnisse);
});

app.get("/top3hersteller", async (req, res) => {
    const ergebnisse = await mongoQuery(
        db.aggregate([
            {
                $group: {
                    _id: "$Hersteller",
                    sum: { $sum: "$VerkaufteMenge" },
                },
            },
        ])
    );
    res.json(ergebnisse);
});
app.get("/besterverkaufstag", async (req, res) => {
    const ergebnisse = await mongoQuery(db.find({}));
    const uebersicht = {};

    ergebnisse.forEach((ergebnis) => {
        const { Datum, VerkaufteMenge } = ergebnis._doc;
        if (uebersicht[Datum]) {
            uebersicht[Datum] += VerkaufteMenge;
        } else {
            uebersicht[Datum] = VerkaufteMenge;
        }
    });

    const besterTag = findeBestenVerkaufstag(uebersicht);
    res.send(besterTag);
});

app.get("/durchschnitt", async (req, res) => {
    const ergebnisse = await mongoQuery(db.find({}));
    const uebersicht = {};
    ergebnisse.forEach((ergebnis) => {
        const { Datum, VerkaufteMenge } = ergebnis._doc;
        if (uebersicht[Datum]) {
            uebersicht[Datum] += VerkaufteMenge;
        } else {
            uebersicht[Datum] = VerkaufteMenge;
        }
    });

    const bestenVerkaufstage = findeBestenVerkaufstage(uebersicht);
    res.send(bestenVerkaufstage);
});

app.get("/SWG", async (req, res) => {
    res.sendFile(__dirname + "/public/view/SWG.html");
});
app.get("/SWG/:param", async (req, res) => {
    if (req.params.param === "uebersicht") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "SWG" }));
        const uebersicht = {};
        ergebnisse.forEach((ergebnis) => {
            const { Datum, VerkaufteMenge } = ergebnis._doc;
            if (uebersicht[Datum]) {
                uebersicht[Datum] += VerkaufteMenge;
            } else {
                uebersicht[Datum] = VerkaufteMenge;
            }
        });
        res.send(uebersicht);
    } else if (req.params.param === "gesamtumsatz") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "SWG" }));
        let gesamtumsatz = 0;
        ergebnisse.forEach((ergebnis) => {
            gesamtumsatz += Math.floor(
                ergebnis._doc.VerkaufteMenge * ergebnis._doc.Preis
            );
        });
        res.json({ gesamtumsatz: gesamtumsatz });
    } else if (req.params.param === "umsatzproschraube") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "SWG" }));
        let schraubenumsatz = {};
        ergebnisse.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenumsatz[Schraube]) {
                schraubenumsatz[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenumsatz[Schraube] = VerkaufteMenge * Preis;
            }
        });
        res.json({ Schraubenumsatz: schraubenumsatz });
    }
});
app.get("/heco", async (req, res) => {
    res.sendFile(__dirname + "/public/view/HECO.html");
});
app.get("/heco/:param", async (req, res) => {
    if (req.params.param === "uebersicht") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "HECO" }));
        const uebersicht = {};
        ergebnisse.forEach((ergebnis) => {
            const { Datum, VerkaufteMenge } = ergebnis._doc;
            if (uebersicht[Datum]) {
                uebersicht[Datum] += VerkaufteMenge;
            } else {
                uebersicht[Datum] = VerkaufteMenge;
            }
        });
        res.send(uebersicht);
    } else if (req.params.param === "gesamtumsatz") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "HECO" }));
        let gesamtumsatz = 0;
        ergebnisse.forEach((ergebnis) => {
            gesamtumsatz += Math.floor(
                ergebnis._doc.VerkaufteMenge * ergebnis._doc.Preis
            );
        });
        res.json({ gesamtumsatz: gesamtumsatz });
    } else if (req.params.param === "umsatzproschraube") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "HECO" }));
        let schraubenumsatz = {};
        ergebnisse.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenumsatz[Schraube]) {
                schraubenumsatz[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenumsatz[Schraube] = VerkaufteMenge * Preis;
            }
        });
        res.json({ Schraubenumsatz: schraubenumsatz });
    }
});
app.get("/wuerth", async (req, res) => {
    res.sendFile(__dirname + "/public/view/wuerth.html");
});
app.get("/wuerth/:param", async (req, res) => {
    if (req.params.param === "uebersicht") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "Wuerth" }));
        const uebersicht = {};
        ergebnisse.forEach((ergebnis) => {
            const { Datum, VerkaufteMenge } = ergebnis._doc;
            if (uebersicht[Datum]) {
                uebersicht[Datum] += VerkaufteMenge;
            } else {
                uebersicht[Datum] = VerkaufteMenge;
            }
        });
        res.send(uebersicht);
    } else if (req.params.param === "gesamtumsatz") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "Wuerth" }));
        let gesamtumsatz = 0;
        ergebnisse.forEach((ergebnis) => {
            gesamtumsatz += Math.floor(
                ergebnis._doc.VerkaufteMenge * ergebnis._doc.Preis
            );
        });
        res.json({ gesamtumsatz: gesamtumsatz });
    } else if (req.params.param === "umsatzproschraube") {
        const ergebnisse = await mongoQuery(db.find({ Hersteller: "Wuerth" }));
        let schraubenumsatz = {};
        ergebnisse.forEach((ergebnis) => {
            const { Schraube, VerkaufteMenge, Preis } = ergebnis._doc;
            if (schraubenumsatz[Schraube]) {
                schraubenumsatz[Schraube] += VerkaufteMenge * Preis;
            } else {
                schraubenumsatz[Schraube] = VerkaufteMenge * Preis;
            }
        });
        res.json({ Schraubenumsatz: schraubenumsatz });
    }
});

app.post("/filtermenu", async (req, res) => {
    req.queryIRGENDWAS;
    res.send("Daten je nach query");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
