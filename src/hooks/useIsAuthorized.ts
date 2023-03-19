import { useMemo } from "react";
import { useAppSelector } from "../store/store";
import { getUserAction } from "../store/userInfoReduser";

export function useIsAuthorized() {
  const user = useAppSelector(state=>state.currentUser).user;

  return useMemo(()=> {
    return user != null
  }, [user])
}

