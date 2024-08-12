// Calculate the total revenue generated
import { jsonData } from "./loadData";

const totalRevenue = jsonData.reduce(
  (total, sale) => (total += sale.price * sale.quantity),
  0
);

console.log("The total revenue generated is: ", totalRevenue);
