// Get sales record for a specific month
import { jsonData } from "./loadData";
import { type Data } from "./types";

import prompt from "prompt-sync";

const input = prompt({ sigint: true });

function getSalesByMonth(salesData: Data[], year: number, month: number) {
  const filteredData = salesData.filter((sale) => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() + 1 === month && saleDate.getFullYear() === year;
  });

  return filteredData;
}

const userInput = input("Enter the date (YYYY-MM):  ");
const [year, month] = userInput?.split("-").map(Number) ?? [0, 0];

if (year === 0 || month === 0) {
  console.error("Invalid date format. Please use YYYY-MM.");
} else {
  const filteredSales = getSalesByMonth(jsonData, year, month);

  console.log(
    `Sales Data for ${new Date(userInput).toISOString()}:\n`,
    filteredSales
  );
}
