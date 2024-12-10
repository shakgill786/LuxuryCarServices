const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SPOTS':
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;