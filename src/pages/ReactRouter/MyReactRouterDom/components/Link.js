import React, { useContext } from "react";
import { RouterContex } from "../contex";

function Link({ to, children, ...resetProps }) {
  const contex = useContext(RouterContex);

  const handClick = (e) => {
    e.preventDefault();
    contex.history.push(to);
  };
  return (
    <a href={to} {...resetProps} onClick={handClick}>
      {children}
    </a>
  );
}

export default Link;
