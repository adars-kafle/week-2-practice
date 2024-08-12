// Finding out total sales for each product
import { jsonData } from "./loadData";

export const totalSalesByProduct = jsonData.reduce((total, sale) => {
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

console.log("The total sales for each product is:\n", totalSalesByProduct);
