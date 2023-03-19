import {ProductType} from "../types/ProductType";

type State = {
  products: ProductType[]
}

const products: State = {
  products: []
};

const SET_PRODUCTS = "GET_PRODUCTS";

export  const productsReduser = (state = products, action: any)=> {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
export const setProductsAction = (payload: any)=>({type: SET_PRODUCTS, payload});
