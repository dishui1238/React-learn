import React, { useEffect } from "react";

function UserPage(props) {
  useEffect(() => {
    console.log("组件挂载成功");
    return () => {
      console.log("组件卸载");
    };
  }, []);
  return <div>UserPage</div>;
}

export default UserPage;
