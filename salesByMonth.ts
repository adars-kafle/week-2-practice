// Get sales record for a specific month
import { jsonData } from "./loadData";
import { type Data } from "./types";

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
