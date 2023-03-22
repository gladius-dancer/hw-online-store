type User = {
  user: {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  },
  status: boolean
}

const user: User = {
  status: false,
  user: {
    id: 0,
    email: "",
    password: "",
    name: "",
    role: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
  }
};

const SET_USER = "SET_USER";
const SET_STATUS = "SET_STATUS";
const GET_USER = "GET_USER";

export const userInfoReduser = (state = user, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    case GET_USER:
      return state;
    default:
      return state;
  }
};
export const setUserAction = (payload: any) => ({ type: SET_USER, payload });
export const setStatusAction = (payload: any) => ({ type: SET_STATUS, payload });
export const getUserAction = () => ({ type: GET_USER });