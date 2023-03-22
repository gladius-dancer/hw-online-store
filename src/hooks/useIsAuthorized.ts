import { useMemo } from "react";
import { useAppSelector } from "../store/store";

export function useIsAuthorized() {
  const user = useAppSelector(state=>state.currentUser).user;

  return useMemo(()=> {
    return user != null
  }, [user])
}

