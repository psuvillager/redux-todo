// Imports redux.createStore, reducers.todoApp, and the props from `actions`
const { createStore } = require('redux');
const { todoApp } = require('./src/reducers');
const {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} = require('./src/actions');

// Defines the store by passing the root reducer to `createStore`
const store = createStore(todoApp);

// Logs the initial state
console.log(store.getState());


// Every time the state changes, logs it (unless suppress == true)
// Note that subscribe() returns a function for unregistering the listener
let suppress;
//suppress = true;
const unsubscribe = store.subscribe( (suppressLogs = suppress) => {
  if(!suppressLogs){
    console.log(store.getState());
  }
});

// Dispatches some test actions

// Stops listening to state updates
unsubscribe();