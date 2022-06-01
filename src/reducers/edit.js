const INITIAL_STATE = {
  editBtn: false,
  editForm: {},
};

const editReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EDIT_BTN_ACTION':
    return {
      ...store,
      editBtn: action.payload,
    };
  case 'EDIT_FORM_ACTION':
    return {
      ...store,
      editForm: action.payload,
    };
  default:
    return store;
  }
};

export default editReducer;
