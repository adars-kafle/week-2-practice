"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Find the product with highest total sales
var salesByProduct_1 = require("./salesByProduct");
function getProductWithHighestSales(sales) {
    return Object.keys(sales).reduce(function (maxProduct, currentProduct) {
        return sales[currentProduct] > sales[maxProduct]
            ? currentProduct
            : maxProduct;
    }, Object.keys(sales)[0]);
}
console.log("Product with highest total sales is: ".concat(getProductWithHighestSales(salesByProduct_1.totalSalesByProduct)));
