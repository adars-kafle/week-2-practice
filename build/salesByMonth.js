"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get sales record for a specific month
const loadData_1 = require("./loadData");
function getSalesByMonth(salesData, month, year) {
    const filteredData = salesData.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() + 1 === month && saleDate.getFullYear() === year;
    });
    return filteredData;
}
let month = 2;
let year = 2023;
const filteredSales = getSalesByMonth(loadData_1.jsonData, month, year);
console.log(`Sales Data for February ${year}:\n`, filteredSales);
