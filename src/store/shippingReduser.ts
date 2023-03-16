type Shipping = {
  extra: number,
  standart: number
  personal: number
  current: string
}

const shipping: Shipping = localStorage.getItem("shipping")?JSON.parse(localStorage.getItem("shipping") || ""): {extra: 4.99, standart: 1.99, personal: 0, current: "personal"};

const SET_SHIPPING = "SET_SHIPPING";
const GET_SHIPPING = "GET_SHIPPING";

export  const shippingReduser = (state = shipping, action: any)=> {
  switch (action.type) {
    case SET_SHIPPING:
      return {...state, current:action.payload};
    case GET_SHIPPING:
      return state;
    default:
      return state;
  }
}
export const setShippingAction = (payload: any)=>({type: SET_SHIPPING, payload});
export const getShippingAction = ()=>({type: GET_SHIPPING});
