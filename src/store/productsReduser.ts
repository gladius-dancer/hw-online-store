import {Product} from "../types/Product";

type State = {
  products: Product[]
}

const products: State = {
  products: []
};

const GET_PRODUCTS = "GET_PRODUCTS";

export  const productsReduser = (state = products, action: any)=> {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
export const getProductsAction = (payload: any)=>({type: GET_PRODUCTS, payload});
