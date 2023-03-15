let products: any[] = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];

const ADD = "ADD";
const GET = "GET";
const UPDATE = "ADD_COUNT";

export const cartReduser = (state = products, action: any)=> {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];
    case GET:
      return state;
    case UPDATE:
      return action.payload;
    default:
      return state;
  }
}
export const addProductAction = (payload: any)=>({type: ADD, payload});
export const getProductsAction = (payload: any)=>({type: GET});
export const updateProductsAction = (payload: any)=>({type: UPDATE, payload});