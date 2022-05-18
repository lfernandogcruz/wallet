// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

export const userReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_ACTION':
      return {
        ...store,
        ...action.payload,
      };
    default:
      return store;
  }
};

// export default userReducer;