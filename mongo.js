import mongoose from "mongoose";
import { dbUrl } from "./secrets.js";

const SchraubenSchema = mongoose.Schema({}, { collection: "schraube" });
export const db = mongoose.model("SchraubenName", SchraubenSchema);

export async function mongoQuery(query) {
    await mongoose.connect(dbUrl);
    var finalArray = [];

    try {
        const elements = await query;
        finalArray = elements;
    } catch (error) {
        finalArray = [];
    }
    return finalArray;
}
