import * as fs from "fs";
import { type Data } from "./types";

// Read File
const data = fs.readFileSync("./salesData.json", "utf-8");

// Parse it as json and export it!
export const jsonData: Data[] = JSON.parse(data);
