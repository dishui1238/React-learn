// logger 中间件可打印redux state变更⽇志

export function logger({ getState }) {
  return (dispatch) => (action) => {
    const prevState = getState();
    console.log("prev state", prevState);

    const returnValue = dispatch(action);
    const nextState = getState();

    console.log("next state", nextState);

    return returnValue;
  };
}
