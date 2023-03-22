import { applyMiddleware, createStore, combineReducers } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productsReduser } from "./productsReduser";
import { categoriesReduser } from "./categoriesReduser";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { changeNavReduser } from "./changeNavReduser";
import { cartReduser } from "./cartReduser";
import { priceReduser } from "./priceReduser";
import { shippingReduser } from "./shippingReduser";
import { userInfoReduser } from "./userInfoReduser";

const rootReduser = combineReducers({
  products: productsReduser,
  categories: categoriesReduser,
  changeNAv: changeNavReduser,
  cart: cartReduser,
  price: priceReduser,
  shipping: shippingReduser,
  currentUser: userInfoReduser,

})

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;