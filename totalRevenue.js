"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Calculate the total revenue generated
var loadData_1 = require("./loadData");
var totalRevenue = loadData_1.jsonData.reduce(function (total, sale) { return (total += sale.price * sale.quantity); }, 0);
console.log("The total revenue generated is: ", totalRevenue);
