"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var data = fs.readFileSync("./salesData.json", "utf-8");
var jsonData = JSON.parse(data);
// Finding out total sales for each product
var totalSalesByProduct = jsonData.reduce(function (total, sale) {
    // If a product already exists, increment the key
    if (total[sale.product]) {
        total[sale.product] += sale.price * sale.quantity;
    }
    // If not, create a new tuple or key-value pair
    else {
        total[sale.product] = sale.price * sale.quantity;
    }
    return total;
}, {});
console.log(totalSalesByProduct);
// Calculate the total revenue generated
var totalRevenue = jsonData.reduce(function (total, sale) { return (total += sale.price * sale.quantity); }, 0);
console.log(totalRevenue);
// Get sales record for a specific month
function getSalesByMonth(salesData, month, year) {
    var filteredData = salesData.filter(function (sale) {
        var saleDate = new Date(sale.date);
        return saleDate.getMonth() + 1 === month && saleDate.getFullYear() === year;
    });
    return filteredData;
}
var month = 2;
var year = 2023;
var filteredSales = getSalesByMonth(jsonData, month, year);
console.log("Sales Data for February ".concat(year, ":\n"), filteredSales);
// Find the product with highest total sales
function getProductWithHighestSales(sales) {
    return Object.keys(totalSalesByProduct).reduce(function (maxProduct, currentProduct) {
        return totalSalesByProduct[currentProduct] >
            totalSalesByProduct[maxProduct]
            ? currentProduct
            : maxProduct;
    }, Object.keys(totalSalesByProduct)[0]);
}
console.log("Product with highest total sales is: ".concat(getProductWithHighestSales(totalSalesByProduct)));
