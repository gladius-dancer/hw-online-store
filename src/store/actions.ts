import axios from "axios";
import { getProductsAction } from "./productsReduser";
import { getCategoriesAction } from "./categoriesReduser";

export function fetchProducts() {
  return async function(dispatch: any) {
    const products = await getProducts();
    dispatch(getProductsAction(products));
  };
}

export function fetchCategories() {
  return async function(dispatch: any) {
    const categories = await getCategories();
    dispatch(getCategoriesAction(categories));
  };
}

const getProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

const getCategories = async () => {
  const response = await axios.get("https://fakestoreapi.com/products/categories");
  return response.data;
};