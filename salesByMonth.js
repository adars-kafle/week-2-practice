"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get sales record for a specific month
var loadData_1 = require("./loadData");
function getSalesByMonth(salesData, month, year) {
    var filteredData = salesData.filter(function (sale) {
        var saleDate = new Date(sale.date);
        return saleDate.getMonth() + 1 === month && saleDate.getFullYear() === year;
    });
    return filteredData;
}
var month = 2;
var year = 2023;
var filteredSales = getSalesByMonth(loadData_1.jsonData, month, year);
console.log("Sales Data for February ".concat(year, ":\n"), filteredSales);
