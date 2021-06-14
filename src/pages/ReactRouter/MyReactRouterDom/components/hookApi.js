import { useContext } from "react";
import { RouterContex } from "../contex";

// hook api 只能用于函数组件

export function useHistory() {
  return useContext(RouterContex).history;
}

export function useLocation() {
  return useContext(RouterContex).location;
}

export function useRouteMatch() {
  return useContext(RouterContex).match;
}

export function useParams() {
  const match = useContext(RouterContex).match;
  return match ? match.params : {};
}
