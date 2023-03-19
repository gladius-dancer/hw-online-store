import axios from "axios";
import { setProductsAction } from "./productsReduser";
import { setUserAction } from "./userInfoReduser";
import { setCategoriesAction } from "./categoriesReduser";

export function fetchProducts(offset: number) {
  return async function(dispatch: any) {
    const products = await getProducts(offset);
    dispatch(setProductsAction(products));
  };
}

export function fetchUser() {
  return async function(dispatch: any) {
    const currentUser = await getUser(JSON.parse(localStorage.getItem("token")));
    dispatch(setUserAction(currentUser));
  };
}

export function loginUser(data: any) {
  return async function(dispatch: any) {
    const token = await login(data.email, data.password);
    localStorage.setItem("token", JSON.stringify(token));
  };
}


export function fetchCategories() {
  return async function(dispatch: any) {
    const categories = await getCategories();
    dispatch(setCategoriesAction(categories));
  };
}

const getProducts = async (offset = 0) => {
  const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=9`);
  return response.data;
};

const getCategories = async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
  return response.data;
};

const login = async (email: string, password: string) => {

  console.log(email);
  console.log(password);

  const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", null,
    {
      params: {
        email: email,
        password: password
      }
    });
  return response.data.access_token;
};

const getUser = async (token: string) => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data;

  } catch (response) {
    return null;
  }

};

