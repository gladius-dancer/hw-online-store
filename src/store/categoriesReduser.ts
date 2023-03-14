import { Product } from "../types/Product";

type State = {
  categories: string[]
}

const categories: State= {
  categories: []
};

const GET_CATEGORY = "GET_CATEGORY";

export const categoriesReduser = (state = categories, action: any)=> {
  switch (action.type) {
    case GET_CATEGORY:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

export const getCategoriesAction = (payload: any)=>({type: GET_CATEGORY, payload});