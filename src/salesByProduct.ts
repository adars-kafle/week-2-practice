// Finding out total sales for each product
import { jsonData } from "./loadData";
import { Data } from "./types";

export const totalSalesByProduct = jsonData.reduce(
  (total: { [key: string]: number }, sale: Data) => {
    // If a product already exists, increment the key
    if (total[sale.product]) {
      total[sale.product] += sale.price * sale.quantity;
    }
    // If not, create a new tuple or key-value pair
    else {
      total[sale.product] = sale.price * sale.quantity;
    }

    return total;
  },
  {} as { [key: string]: number }
);

// Check if a certain flag is passed to avoid console logging
if (process.env.SHOW_OUTPUT === "true") {
  // Format the sales
  const formattedSales = Object.fromEntries(
    Object.entries(totalSalesByProduct).map(
      ([product, total]) =>
        [product, `NRS. ${total?.toLocaleString()}`] as [string, string]
    )
  );
  console.log("The total sales for each product is:\n", formattedSales);
}
