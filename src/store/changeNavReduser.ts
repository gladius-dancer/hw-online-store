const nav = false;

const SET_NAV = "SET_NAV";
const GET_NAV = "SET_NAV";

export const changeNavReduser = (state = nav, action: any)=> {
  switch (action.type) {
    case SET_NAV:
      return !state;
    case GET_NAV:
      return state;
    default:
      return state;
  }
}

export const changeNavAction = (payload: any)=>({type: SET_NAV, payload});