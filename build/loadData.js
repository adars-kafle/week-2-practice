"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonData = void 0;
// Read File
const salesData_json_1 = __importDefault(require("../data/salesData.json"));
// Parse it as json and export it!
exports.jsonData = salesData_json_1.default;
console.log(exports.jsonData);
