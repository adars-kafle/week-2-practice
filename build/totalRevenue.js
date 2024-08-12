"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Calculate the total revenue generated
const loadData_1 = require("./loadData");
const totalRevenue = loadData_1.jsonData.reduce((total, sale) => (total += sale.price * sale.quantity), 0);
console.log("The total revenue generated is: ", totalRevenue);
