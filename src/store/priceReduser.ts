type Price={
  totalPrice: number,
  shipping: number
}

const price: Price = localStorage.getItem("totalPrice")?JSON.parse(localStorage.getItem("totalPrice") || ""):{totalPrice: 0, shipping: 0};

const SET_PRICE = "SET_PRICE";
const GET_PRICE = "GET_PRICE";
const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";

export  const priceReduser = (state = price, action: any)=> {
  switch (action.type) {
    case SET_PRICE:
      return {totalPrice: action.payload.totalPrice, shipping: action.payload.shipping};
    case GET_PRICE:
      return state;
    case GET_TOTAL_PRICE:
      return state.totalPrice + state.shipping;
    default:
      return state;
  }
}
export const setPriceAction = (payload: any)=>({type: SET_PRICE, payload});
export const getPriceAction = ()=>({type: GET_PRICE});
export const getTotalPriceAction = ()=>({type: GET_TOTAL_PRICE});
