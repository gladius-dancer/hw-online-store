import axios from "axios";
import { setProductsAction } from "./productsReduser";
import { setStatusAction, setUserAction } from "./userInfoReduser";
import { setCategoriesAction } from "./categoriesReduser";

export function fetchProducts(offset: number) {
  return async function(dispatch: any) {
    const products = await getProducts(offset);
    dispatch(setProductsAction(products));
  };
}

export function fetchFilteredProducts(category: number, min: number, max: number) {
  return async function(dispatch: any) {
    const filteredProducts = await getFilteredProducts(category, min, max);
    dispatch(setProductsAction(filteredProducts));
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
    if(token !== null){
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(setStatusAction(true));
      dispatch(fetchUser())
    }else{
      dispatch(setStatusAction(false));
    }
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

const getFilteredProducts = async (category: number, min: number, max: number) => {
  const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}&categoryId=${category}`);
  return response.data;
};

const getCategories = async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
  return response.data;
};

const login = async (email: string, password: string) => {
  try{
    const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", null,
      {
        params: {
          email: email,
          password: password
        }
      });
    return response.data.access_token;
  }
  catch (error) {
    return null
  }

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

  } catch (error) {
    return null;
  }
};

