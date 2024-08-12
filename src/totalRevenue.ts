// Calculate the total revenue generated
import { jsonData } from "./loadData";
import { type Data } from "./types";

const totalRevenue = jsonData.reduce(
  (total: number, sale: Data) => (total += sale.price * sale.quantity),
  0
);

console.log("The total revenue generated is: ", totalRevenue);
