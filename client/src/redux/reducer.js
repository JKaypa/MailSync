import { GET_MEMBERS } from "./actions";

const initState = {
  contacts: [],
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_MEMBERS:
      return {
        contacts: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
