"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonData = void 0;
var fs = require("fs");
// Read File
var data = fs.readFileSync("./salesData.json", "utf-8");
// Parse it as json and export it!
exports.jsonData = JSON.parse(data);
