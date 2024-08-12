"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalSalesByProduct = void 0;
// Finding out total sales for each product
const loadData_1 = require("./loadData");
exports.totalSalesByProduct = loadData_1.jsonData.reduce((total, sale) => {
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
console.log("The total sales for each product is:\n", exports.totalSalesByProduct);
