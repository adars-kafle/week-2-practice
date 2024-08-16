// Find the product with highest total sales
import { totalSalesByProduct } from "./salesByProduct";

function getProductWithHighestSales(sales: { [key: string]: number }): string {
  return Object.keys(sales).reduce((maxProduct, currentProduct) => {
    return sales[currentProduct] > sales[maxProduct]
      ? currentProduct
      : maxProduct;
  }, Object.keys(sales)[0]);
}

const highestSalesProduct = getProductWithHighestSales(totalSalesByProduct);

console.log(
  `Product with highest total sales is: ${highestSalesProduct} with sales: NRS. ${totalSalesByProduct[highestSalesProduct]}`
);
