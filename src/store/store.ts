import { applyMiddleware, createStore, combineReducers } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productsReduser } from "./productsReduser";
import { categoriesReduser } from "./categoriesReduser";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { changeNavReduser } from "./changeNavReduser";

const rootReduser = combineReducers({
  products: productsReduser,
  categories: categoriesReduser,
  changeNAv: changeNavReduser
})

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;