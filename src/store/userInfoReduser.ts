type User = {
  id: number,
  email: number,
  password: number,
  name: string,
  role: string,
  avatar: string,
  createdAt: string,
  updatedAt: string
}

const user: User = {};

const SET_USER = "SET_USER";
const GET_USER = "GET_USER";

export const userInfoReduser = (state = user, action: any)=> {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload);
      return {...state,user:action.payload};
    case GET_USER:
      console.log(state);
      return state;
    default:
      return state;
  }
}
export const setUserAction = (payload: any)=>({type: SET_USER, payload});
export const getUserAction = ()=>({type: GET_USER});