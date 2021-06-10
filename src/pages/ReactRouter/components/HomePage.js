import React from "react";
// import {
//   useHistory,
//   useLocation,
//   useParams,
//   useRouteMatch,
// } from "react-router-dom";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "../MyReactRouterDom";

/**
 * hooks API
 * useHistory
 * useLocation
 * useRouteMatch
 * useParams
 */

function HomePage(props) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();

  console.log(history, location, params, match);
  return <div>HomePage</div>;
}

export default HomePage;
