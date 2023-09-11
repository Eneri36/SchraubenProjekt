import mongoose from "mongoose";
import { dbUrl } from "./secrets.js";

const SchraubenSchema = mongoose.Schema({}, { collection: "schraube" });
const HerstellerModel = mongoose.model("HerstellerName", SchraubenSchema);

export async function mongoHerstellerQuery(hersteller) {
    await mongoose.connect(dbUrl);

    try {
        const elements = await HerstellerModel.find({
            Hersteller: hersteller,
        }).exec();
        return elements;
    } catch (error) {
        console.error("Fehler bei der Abfrage:", error);
    }
}
