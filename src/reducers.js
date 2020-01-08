const {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} = require('./actions');

const initialState = {
  todos: [],
  visibilityFilter: VisibilityFilters.SHOW_ALL
}

function todoApp(state = initialState, action){
  switch(action.type){

    case ADD_TODO:
      const newTodo = { text: action.text, completed: false }; 
      return Object.assign({}, state, { todos: [...state.todos, newTodo] });

    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map( (todo, ind) => {
          if(ind === action.index){
            console.log("toggleTodo:");
            console.log(todo);
            ///const updatedStatus = !todo.completed;
            //return Object.assign({}, todo, { completed: updatedStatus } );
          }
        })
      });
      const newState = Object.assign({}, state);
      newState.todos[action.index].completed = !newState.todos[action.index].completed;
      return newState;

    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, { visibilityFilter: action.filter });

    default:
      return state;
  }
}

exports.todoApp = todoApp;