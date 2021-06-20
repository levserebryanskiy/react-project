const initialState = {
  tasks: [],
  category: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_task':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'add_task':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'delete_task':
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      };
    case 'get_category':
      console.log('--------', action);

      return {
        ...state,
        category: action.payload,
      };
    case 'add_category':
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
