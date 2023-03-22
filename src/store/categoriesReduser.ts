import { CategoryType } from "../types/CategoryType";

type State = {
  categories: CategoryType[]
}

const categories: State = {
  categories: []
};

const SET_CATEGORY = "SET_CATEGORY";
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";

export const categoriesReduser = (state = categories, action: any) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, categories: action.payload };
    case SET_CURRENT_CATEGORY:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export const setCategoriesAction = (payload: any) => ({ type: SET_CATEGORY, payload });
export const setCurrentCategoriesAction = (payload: any) => ({ type: SET_CURRENT_CATEGORY, payload });