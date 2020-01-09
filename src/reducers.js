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
      // Should probably be done using `map` or `reduce` instead of `forEach`

      // Makes a copy of todos
      const copyOfTodos = state.todos.map(todo => Object.assign({}, todo));

      // Makes a (deep) copy of state using copyOfTodos
      const copyOfState = Object.assign({}, state, { todos: copyOfTodos });


      // Finds the todo with the matching index and toggles its `completed` prop
      copyOfState.todos.forEach((todo, ind)=>{
        if(ind === action.index){
          todo.completed = !todo.completed;
        }
      });

      // Returns the mutated copy (leaving original state unchanged)
      return copyOfState;

    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, { visibilityFilter: action.filter });

    default:
      return state;
  }
}

exports.todoApp = todoApp;