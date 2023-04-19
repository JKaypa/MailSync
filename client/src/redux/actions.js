import axios from "axios";

export const GET_MEMBERS = "GET_MEMBERS";

export const getMembers = () => {
  return async function (dispatch) {
    const { data } = await axios("http://localhost:3001/");
    return dispatch({ type: GET_MEMBERS, payload: data });
  };
};
