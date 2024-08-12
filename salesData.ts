import * as fs from "fs";

const data = fs.readFileSync("./salesData.json", "utf-8");

interface Data {
  id: number;
  product: string;
  date: Date;
  quantity: number;
  price: number;
}

const jsonData: Data[] = JSON.parse(data);

// Finding out total sales for each product
const totalSalesByProduct = jsonData.reduce((total, sale) => {
  // If a product already exists, increment the key
  if (total[sale.product]) {
    total[sale.product] += sale.price * sale.quantity;
  }
  // If not, create a new tuple or key-value pair
  else {
    total[sale.product] = sale.price * sale.quantity;
  }

  return total;
}, {} as { [key: string]: number });
console.log(totalSalesByProduct);

// Calculate the total revenue generated
const totalRevenue = jsonData.reduce(
  (total, sale) => (total += sale.price * sale.quantity),
  0
);
console.log(totalRevenue);

// Get sales record for a specific month
function getSalesByMonth(salesData: Data[], month: number, year: number) {
  const filteredData = salesData.filter((sale) => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() + 1 === month && saleDate.getFullYear() === year;
  });

  return filteredData;
}

let month = 2;
let year = 2023;
const filteredSales = getSalesByMonth(jsonData, month, year);
console.log(`Sales Data for February ${year}:\n`, filteredSales);

// Find the product with highest total sales
function getProductWithHighestSales(sales: { [key: string]: number }): string {
  return Object.keys(totalSalesByProduct).reduce(
    (maxProduct, currentProduct) => {
      return totalSalesByProduct[currentProduct] >
        totalSalesByProduct[maxProduct]
        ? currentProduct
        : maxProduct;
    },
    Object.keys(totalSalesByProduct)[0]
  );
}

console.log(
  `Product with highest total sales is: ${getProductWithHighestSales(
    totalSalesByProduct
  )}`
);
